export const getDeals = async () => {
  const res = await fetch(`https://simple-hash-server-mcs.herokuapp.com/`);

  return res.json();
};

export const getDealByHash = async (hash) => {
  const res = await fetch(`https://simple-hash-server-mcs.herokuapp.com/hashs/${hash}`);

  return res.json();
};

export const postDeal = async (req) => {
  const res = await fetch(`https://simple-hash-server-mcs.herokuapp.com/`, {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(req),
  });

  return res.json();
};
