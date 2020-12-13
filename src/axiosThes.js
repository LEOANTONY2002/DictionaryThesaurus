import axios from "axios";

export default axios.create({
  baseURL: "https://www.dictionaryapi.com/api/v3/references/thesaurus/json",
  params: {
    key: "42f05a52-fe62-49bf-9feb-b0fc266347ba",
  },
});
