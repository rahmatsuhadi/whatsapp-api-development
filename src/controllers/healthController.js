const fs = require("fs");
const qrcode = require("qrcode-terminal");
const { sessionFolderPath } = require("../config");
const { sendErrorResponse } = require("../utils");
const { getMatakuliah } = require("./amikomController");
const { sessions } = require("../sessions");

/**
 * Responds to ping request with 'pong'
 *
 * @function ping
 * @async
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise that resolves once response is sent
 * @throws {Object} - Throws error if response fails
 */
const ping = async (req, res) => {
  /*
    #swagger.tags = ['Various']
  */
  try {
    res.json({ success: true, message: "pong" });
  } catch (error) {
    sendErrorResponse(res, 500, error.message);
  }
};

/**
 * Example local callback function that generates a QR code and writes a log file
 *
 * @function localCallbackExample
 * @async
 * @param {Object} req - Express request object containing a body object with dataType and data
 * @param {string} req.body.dataType - Type of data (in this case, 'qr')
 * @param {Object} req.body.data - Data to generate a QR code from
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Promise that resolves once response is sent
 * @throws {Object} - Throws error if response fails
 */
const localCallbackExample = async (req, res) => {
  let token =
    "yeWjADzSGOqQCLv0mSrzDJL9zpauNGwUz6TrkkD5X9zhN-8u8a6ih0nKTqKu-AimYqssiTssgsJu2R57GR8GiW1-pydp9S9mlC6YPfQ1yS0xKAgVL7EK8m3RMB-iCMaiNdWaAnKwDqsBbR0eDewEXwdZjiktkhHr8qleO9cgKUARhspKdASPjb_XneyRw4OaZRtRTSPDiV9Tb1SGZuhvyC6HjTC7ZW6ukeFY-o5hXW88zGpjKe8zDUYgA3yhyOfIZdTyBbqDoEUP95MMa-oLKmIT_SHZjoqUFwzi9hA5yzpE6bmw3dk6aET7Ff059pxBd82OcIJTEEU4PbQ1WAf02S3n1qg4Gktax9Bskl6b-vJbkQ71QzEjlKufHh89YCTNsNfli-zGxZqeZpvXvVFLIGmTIQlDBlYzffl0TiXmXE9vQLaOw1-o18ZQH5iUXby2c7b4U55k3OKa29tCqPxS43S47GlODlB5ZzepgsskbUHAU8-FdGgKGnOwNbSultS4F5H3Yg";
  /*
    #swagger.tags = ['Various']
  */
  try {
    const { dataType, data, sessionId } = req.body;

    if (dataType === "qr") {
      qrcode.generate(data.qr, { small: true });
    } else if (dataType == "message") {
      const { id, body } = data.message["_data"];
      const messageId = id.id;
      const chatId = id.remote;

      const client = sessions.get(sessionId);
      const chat = await client.getChatById(chatId);
      const messages = await chat.fetchMessages({ limit: 100 });

      const message = messages.find((message) => {
        return message.id.id === messageId;
      });

      if (body.startsWith("/mi")) {
        const parts = body.split(" ");
        const command = parts[1]; // Ambil perintah setelah '/mi'
        

        const { id } = data;

        const nim = "23.01.4968"; // Ganti dengan nim yang valid

        if (command === "info-matkul") {
          
        const hari = parts[2]; // Ambil perintah setelah '/mi'

          const today = new Date()
            .toLocaleString("id-ID", { weekday: "long" })
            .toUpperCase();
          const matakuliahToday = await getMatakuliah(nim, token);
          const todayClasses = matakuliahToday.filter(
            (matkul) => matkul.Hari === String(hari).toUpperCase() ?? today
          );
          const responseMessage = todayClasses
          .map((matkul) => {
              return `📚 *${matkul.MataKuliah}* (${matkul.Kode})\n` +
                     `🕒 Waktu: *${matkul.Waktu}*\n` +
                     `👨‍🏫 Dosen: *${matkul.NamaDosen}*\n` +
                     `💻 Zoom: [Link Zoom](${matkul.ZoomURL})\n` +
                     `-------------------------------------`;
          })
          .join("\n");
            console.log(responseMessage,matakuliahToday)
          const repliedMessage = await message.reply(responseMessage, chatId);
        }
      }
    }

    //   if (dataType=='message' && data.body.startsWith('/mi')) {
    //     const parts = message.split(' ');
    //     const command = parts[1]; // Ambil perintah setelah '/mi'

    //     const {id} = data

    //     const nim = '21.01.4968'; // Ganti dengan nim yang valid

    //     // if (command === 'all-matkul') {
    //     //     const matakuliah = await getMatakuliah(nim, token);
    //     // } else if (command === 'info-matkul') {

    //     //   // const today = new Date().toLocaleString('id-ID', { weekday: 'long' }).toUpperCase();
    //     //   // const matakuliahToday = await getMatakuliah(nim, token);
    //     //   // const todayClasses = matakuliahToday.filter(matkul => matkul.Hari === today);
    //     //   // const responseMessage = todayClasses.map(matkul => {
    //     //   //     return `${matkul.MataKuliah} (${matkul.Kode}) - ${matkul.Waktu} - Dosen: ${matkul.NamaDosen}`;
    //     //   // }).join('\n');

    //     // const { messageId, chatId, content, destinationChatId, options } = req.body
    //     // const client = sessions.get(req.params.sessionId)
    //     // const message = await _getMessageById(client, messageId, chatId)
    //     // if (!message) { throw new Error('Message not Found') }
    //     // const repliedMessage = await message.reply(content, destinationChatId, options)

    //     // }
    // }

    fs.writeFile(
      `${sessionFolderPath}/message_log.txt`,
      `${JSON.stringify(req.body)}\r\n`,
      { flag: "a+" },
      (_) => _
    );
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    fs.writeFile(
      `${sessionFolderPath}/message_log.txt`,
      `(ERROR) ${JSON.stringify(error)}\r\n`,
      { flag: "a+" },
      (_) => _
    );
    sendErrorResponse(res, 500, error.message);
  }
};

module.exports = { ping, localCallbackExample };
