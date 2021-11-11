import axios from "axios";

export const getQuote = async () => {
  try {
    const { data } = await axios.get("https://api.quotable.io/random");
    const quote = {
      id: data._id,
      content: data.content,
      author: data.author,
      tags: data.tags,
    };
    return quote;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const getQuotebySearch = async (tag, id) => {
  try {
    let { data } = await axios.get(
      `https://api.quotable.io/random?tags=${tag}`
    );

    while (data._id === id) {
      let data2 = await axios.get(`https://api.quotable.io/random?tags=${tag}`);
      data._id = data2.data._id;
      data.content = data2.data.content;
      data.author = data2.data.author;
    }

    const count = await axios.get(`https://api.quotable.io/quotes?tags=${tag}`);

    const quote = {
      id: data._id,
      content: data.content,
      author: data.author,
      tags: data.tags,
      totalCount: count.data.count,
    };

    return quote;
  } catch (error) {
    console.log("error: ", error);
    const quote = {
      id: 404,
      content: `There is no quote for ${tag}`,
      author: "404 Monster",
      tags: "nope",
      totalCount: 0,
    };
    return quote;
  }
};
