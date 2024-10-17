const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Прокси для POST-запросов
app.post("/proxy", async (req, res) => {
  try {
    const googleScriptUrl =
      "https://script.google.com/macros/1R8ObHqbd4vqwm77h64cd-rpWmXezhbsIpaRmEaHyFz7Tsp38xYKSkdPk/exec";

    // Пересылаем запрос на Google Apps Script
    const response = await axios.post(googleScriptUrl, req.body);

    // Возвращаем ответ клиенту
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ error: "Ошибка при отправке запроса на Google Apps Script" });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
