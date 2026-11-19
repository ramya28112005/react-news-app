
import React, { Component } from 'react';

export class NewsItems extends Component {

    render() {

        let {
            title,
            description,
            imageUrl,
            newsUrl,
            author,
            date,
            source
        } = this.props;

        return (

            <div className="my-3">

                <div className="card news-card">

                    <span
                        className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
                        style={{
                            left: "90%",
                            zIndex: "1"
                        }}
                    >
                        {source}
                    </span>

                    <img
                        src={
                            imageUrl
                                ? imageUrl
                                : "https://placehold.co/600x400?text=News"
                        }
                        className="card-img-top"
                        alt="News"
                    />

                    <div className="card-body">

                        <h5 className="card-title">
                            {title}...
                        </h5>

                        <p className="card-text">
                            {description}...
                        </p>

                        <p className="card-text">
                            <small className="text-muted">
                                By {author} on {
                                    date
                                        ? new Date(date).toGMTString()
                                        : "Date unavailable"
                                }
                            </small>
                        </p>

                        <a
                            rel="noreferrer"
                            href={newsUrl}
                            target="_blank"
                            className="btn btn-sm btn-danger"
                        >
                            READ MORE
                        </a>

                    </div>

                </div>

            </div>

        );
    }
}

export default NewsItems;
