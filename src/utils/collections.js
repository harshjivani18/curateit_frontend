import axios from "axios";

const prepareChildrens = (collections, childrens) => {
  childrens.forEach((c) => {
    collections.forEach((p, index) => {
      if (p.id === c.parent?.$id) {
        collections[index].folders.push({
          title: c.title,
          folders: [],
          bookmarks: c.bookmarks.map((b) => {
            return {
              title: b.title,
              link: b.link,
              icon: b.cover !== "" ? b.cover : null,
            };
          }),
          id: c._id,
        });
      } else {
        collections[index].folders = prepareChildrens(p.folders, [c]);
      }
      collections[index] = {
        ...collections[index],
      };
      collections = [...collections];
    });
  });
  return collections;
};

export const prepareCollections = (parents, childrens) => {
  if (!parents || !childrens) return [];
  // const collectionArr = [ ...parents, ...childrens ]
  const parentsData = parents.map((p) => {
    return {
      title: p.title,
      folders: [],
      bookmarks: p.bookmarks.map((b) => {
        return {
          title: b.title,
          link: b.link,
          icon: b.cover !== "" ? b.cover : null,
        };
      }),
      id: p._id,
    };
  });
  return prepareChildrens(
    parentsData,
    childrens.sort((a, b) => a._id - b._id)
  );
};

export const addBookmarks = async (collections, childrens, accessToken) => {
  const parents = [];
  const childs = [];

  for (const c of collections) {
    const books = await axios.get(
      `https://api.raindrop.io/rest/v1/raindrops/${c._id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    parents.push({
      ...c,
      bookmarks: books.data?.items ? books.data.items : [],
    });
  }

  for (const c of childrens) {
    const books = await axios.get(
      `https://api.raindrop.io/rest/v1/raindrops/${c._id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    childs.push({
      ...c,
      bookmarks: books.data?.items ? books.data.items : [],
    });
  }

  return { parents, childs };
};

const generateBookmarksPromises = (folderId, accessToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.raindrop.io/rest/v1/raindrops/${folderId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        if (res.data?.items) {
          const arr = [];
          res.data.items.forEach((b) => {
            arr.push({
              title: b.title,
              link: b.link,
              icon: b.cover !== "" ? b.cover : null,
              id: b._id,
            });
          });
        }
      });
  });
};
export const prepareBookmarks = (
  collections,
  accessToken,
  cLength,
  counter = 0
) => {
  return collections.map((c) => {
    return new Promise((resolve, reject) => {
      const promises = [];
      c.folders.forEach((folder) => {
        promises.push(generateBookmarksPromises(folder.id, accessToken));
        Promise.all(promises).then((res) => {
          c.bookmarks = res;
          resolve(c);
        });
        if (folder.folders.length !== 0) {
        }
      });
    });
  });
};

export const getRaindropHighlightsPageWise = (page, accessToken) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://api.raindrop.io/rest/v1/highlights?page=${page}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        resolve(res.data?.items ? res.data.items : []);
      });
  });
};

export const getRaindropHighlights = async (accessToken) => {
  const highlights = [];
  let page = 0;
  while (true) {
    const res = await getRaindropHighlightsPageWise(page, accessToken);
    if (res.length === 0) break;
    highlights.push(...res);
    page++;
  }
  return highlights;
};
