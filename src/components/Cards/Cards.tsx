import { useEffect, useState } from "react";
import { url } from "../../config";
import useSimpleGet from "../../hooks/useSimpleGet";
import { blogPostsDataToCardProps, divideArrayIntoChunks } from "../../utils";
import { Card, CardProps } from "./Card";

export const Cards = () => {
  const { data, isFetching } = useSimpleGet(url.blogPosts);
  const [formatedData, setFormatedData] = useState<CardProps[][] | null>(null);
  useEffect(() => {
    if (data && !isFetching) {
      const cardProps = blogPostsDataToCardProps(data);
      setFormatedData(divideArrayIntoChunks(cardProps));
    }
  }, [data, isFetching]);
  return isFetching || !formatedData ? null : (
    <div className="Cards u-no-padding--bottom p-strip--suru">
      {formatedData.map((cards, index) => (
        <div key={index} className="row u-equal-height">
          {cards.map((props) => (
            <Card key={props.id} {...props} />
          ))}
        </div>
      ))}
    </div>
  );
};
