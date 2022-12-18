import React from "react";
import { formatDate } from "../../utils";
import "./Card.scss";

type Image = {
  src: string;
  alt: string;
};

type Author = {
  name: string;
  link: string;
};

export type CardProps = {
  articleLink: string;
  authors: Author[];
  category: string;
  date: string;
  id: number;
  image: Image;
  title: string;
  topic: string;
};

export const Card = ({
  articleLink,
  authors,
  category,
  date,
  image,
  id,
  title,
  topic,
}: CardProps) => {
  return (
    <div
      id={`card-${id}`}
      className="Card u-no-padding--top u-no-padding--bottom col-4 p-card--highlighted"
    >
      <header>{topic}</header>
      <div className="p-card__content">
        <div>
          <a href={articleLink} target="_blank" rel="noreferrer">
            <img
              className="p-card__image"
              loading="lazy"
              alt={image.alt}
              src={image.src}
            />
          </a>
        </div>
        <h3>
          <a href={articleLink} target="_blank" rel="noreferrer">
            {title}
          </a>
        </h3>
        <p>
          <em>
            by{" "}
            {authors.map((author, index) => (
              <React.Fragment key={index}>
                <a href={author.link} target="_blank" rel="noreferrer">
                  {author.name}
                </a>
                {authors.length - 1 > index ? ", " : ""}
              </React.Fragment>
            ))}{" "}
            on {formatDate(date)}
          </em>
        </p>
      </div>
      <div className="card-footer">{category}</div>
    </div>
  );
};

export default Card;
