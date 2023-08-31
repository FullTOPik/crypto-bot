import * as TelegramBot from "node-telegram-bot-api";
import { getPriceUSD, getTransactions } from "./tron";
import { TELEGRAM_TOKEN } from "./config";
import { ITransaction } from "./interfases";
import { UserRepository } from "./repository/user.repository";

const bot = new TelegramBot(TELEGRAM_TOKEN as string, { polling: true });

let lastTimestamp = Date.now() - 120000;

bot.on("message", (msg) => handlerTelegramChat(msg));

const handlerTelegramChat = (msg: TelegramBot.Message) => {
  const { id: chatId, first_name, last_name, username } = msg.chat;

  const user = await UserRepository.findUserByTelegramId(chatId);
  if (user)
    return bot.sendMessage(chatId, "You've already subscribed");

  await UserRepository.createUser({
    firstName: first_name ?? '',
    lastName: last_name ?? '',
    userName: username ?? `${chatId}`,
    telegramId: chatId
  })
  bot.sendMessage(chatId, "You was subscribe");

const createMessage = async (transactions: ITransaction[]) => {
  const priceUSDPerOne = await getPriceUSD();
  let message = "";

  transactions.forEach((transaction: ITransaction, index: number) => {
    const { raw_data, txID } = transaction;
    if (!raw_data) return;

    const { to_address, owner_address, amount } =
      raw_data.contract[0].parameter.value;

    if (amount < 10000) return;

    if (index !== 0) message += "\n";

    message += `
      От кого (адрес): ${owner_address}
      Кому (адрес): ${to_address}
      Сумма: ${(+amount).toFixed(2)}
      Сумма в $: ${(+amount * priceUSDPerOne).toFixed(2)}
      TxID: ${txID}
    `;
  });

  return message;
};

const findLastTransactionsAndSend = async (): Promise<void> => {
  try {
    const endTimestamp = Date.now();
    const transactions = await getTransactions(lastTimestamp, endTimestamp);

    if (!transactions || !transactions[0]) return;

    const [message, users] = await Promise.all([
      createMessage(transactions),
      UserRepository.findAllUsers()
    ]) 

    if(!users || !message) return;

    users.forEach(({telegramId}) => bot.sendMessage(telegramId, message));
    lastTimestamp = endTimestamp;

    console.log(transactions);
  } catch (err) {
    console.error(err);
  }
};

setInterval(findLastTransactionsAndSend, 5000);
