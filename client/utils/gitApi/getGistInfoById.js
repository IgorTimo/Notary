const getGistInfoById = async (gistId) => {
  const response = await fetch(`https://api.github.com/gists/${gistId}`);
  const data = await response.json();
  let fileName = Object.values(data.files);
  let owner = {
    creator: data.owner.login,
    text: fileName[0].content,
    lastUpdate: data.updated_at,
  };

  return owner;
};
export default getGistInfoById;
