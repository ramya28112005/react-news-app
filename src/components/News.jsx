import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItems from './NewsItems';
import Spinner from './Spinner';

export class News extends Component {

    static defaultProps = {
        country: "us", // Kept as "us" so NewsAPI returns articles (change to "in" only if using /v2/everything)
        pageSize: 6,
        category: "general"
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        };
    }

    async componentDidMount() {
        await this.fetchNews(this.state.page);
    }

    fetchNews = async (page) => {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=MY_API_KEY&page=${page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true });

        try {
            const data = await fetch(url);
            const parsedData = await data.json();

            if (parsedData.status === "ok") {
                this.setState({
                    page,
                    articles: parsedData.articles || [],
                    totalResults: parsedData.totalResults || 0,
                    loading: false
                });
            } else {
                this.setState({ loading: false });
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
            this.setState({ loading: false });
        }
    };

    handleNext = async () => {
        const nextPage = this.state.page + 1;
        const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

        if (nextPage <= totalPages) {
            await this.fetchNews(nextPage);
        }
    };

    handlePrev = async () => {
        const previousPage = this.state.page - 1;

        if (previousPage >= 1) {
            await this.fetchNews(previousPage);
        }
    };

    render() {
        const totalPages = Math.ceil(this.state.totalResults / this.props.pageSize);

        return (
            <div className="container my-3">

                <h2 className="text-center" style={{ margin: '35px 0px' }}>
                    News - Top Headlines
                </h2>

                {/* Conditional Rendering: Shows Spinner while loading */}
                {this.state.loading && <Spinner />}

                {!this.state.loading && this.state.articles.length === 0 && (
                    <p className="text-center text-muted my-4">
                        No articles found for this selection.
                    </p>
                )}

                {/* Conditional Rendering: Shows articles only when loading is false */}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-3 my-3" key={element.url}>
                                <NewsItems
                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source?.name}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="container d-flex justify-content-between my-3">

                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrev}
                        disabled={this.state.page <= 1 || this.state.loading}
                    >
                        &larr; Previous
                    </button>

                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNext}
                        disabled={this.state.page >= totalPages || this.state.loading}
                    >
                        Next &rarr;
                    </button>

                </div>

                <p className="text-center">
                    Page {this.state.page} {totalPages > 0 && `of ${totalPages}`}
                </p>

            </div>
        );
    }
}

export default News;
