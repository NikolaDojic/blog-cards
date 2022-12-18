export type Post = {
  id: number;
  date_gmt: string;
  link: string;
  featured_media: string;
  title: {
    rendered: string;
  };
  _embedded: {
    author: [
      {
        name: string;
        link: string;
      }
    ];
    "wp:term": [[{ taxonomy: string; name: string }]];
  };
};

const DEFAULT_TOPIC = "various";

export const blogPostDataToCardProps = (post: Post) => {
  return {
    id: post.id,
    articleLink: post.link,
    authors: post._embedded.author.map((author) => ({
      name: author.name,
      link: author.link,
    })),
    category: formatCategories(getDataFromPost(post, CATEGORY)),
    date: post.date_gmt,
    image: {
      src: post.featured_media,
      alt: "",
    },
    title: post.title.rendered,
    topic: getDataFromPost(post, TOPIC) || DEFAULT_TOPIC,
  };
};

const formatCategories = (categories: string) =>
  categories.replaceAll("Articles", "Article");

export const blogPostsDataToCardProps = (posts: Post[]) =>
  posts.map(blogPostDataToCardProps);

const CATEGORY = "category";
const TOPIC = "topic";
type DataType = "topic" | "category";

const getDataFromPost = (post: Post, dataType: DataType) => {
  const wpTerms = post._embedded["wp:term"];
  const details = wpTerms.find((terms) =>
    terms.some((term) => term.taxonomy === dataType)
  );
  const dataString = details?.map((item) => item.name).join(", ") || "";
  return dataString;
};

export const divideArrayIntoChunks = <T>(array: T[], chunkSize = 3): T[][] => {
  return array.reduce(
    (resultArray, item, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);

      return resultArray;
    },
    [[]] as T[][]
  );
};

export const formatDate = (ISOStringDate: string) =>
  new Date(ISOStringDate).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
