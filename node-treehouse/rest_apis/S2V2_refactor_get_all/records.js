const fs = require("fs");

class Records {
  generateRandomId() {
    return Math.floor(Math.random() * 10000);
  }

  save(data) {
    return new Promise((resolve, reject) => {
      fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  /**
   * Gets all quotes
   * @param None
   */
  getQuotes() {
    return new Promise((resolve, reject) => {
      fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const json = JSON.parse(data);
          resolve(json);
        }
      });
    });
  }

  /**
   * Gets a specific quote by ID
   * @param {number} id - Accepts the ID of the specified quote.
   */
  async getQuote(id) {
    const { records } = await this.getQuotes();
    return records.find((record) => record.id == id);
  }

  /**
   * Gets a random quote
   * @param None
   */
  async getRandomQuote() {
    const { records } = await this.getQuotes();
    const randNum = Math.floor(Math.random() * records.length);
    return records[randNum];
  }

  /**
   * Creates a new quote record
   * @param {Object} newRecord - Object containing info for new quote: the quote text, author and year
   */
  async createQuote(newRecord) {
    const { records } = await this.getQuotes();

    newRecord.id = this.generateRandomId();
    records.push(newRecord);
    await this.save({ records: [...records] });
    return newRecord;
  }

  /**
   * Updates a single record
   * @param {Object} newQuote - An object containing the changes to quote: quote, author, year (all optional)
   */
  async updateQuote(newQuote) {
    const { records } = await this.getQuotes();
    const quote = records.find((item) => item.id == newQuote.id);

    for (let key in quote) {
      if (key !== "id") {
        quote[key] = newQuote[key];
      }
    }

    await this.save({ records: [...records] });
  }

  /**
   * Deletes a single record
   * @param {Object} record - Accepts record to be deleted.
   */
  async deleteQuote(record) {
    let { records } = await this.getQuotes();
    records = records.filter((item) => item.id != record.id);
    await this.save({ records: [...records] });
  }
}

module.exports = new Records();
