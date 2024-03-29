import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedText } from '07-shared/ui/FormattedText';
import { PageLoader } from '07-shared/ui/PageLoader/PageLoader';
import { classNames } from '07-shared/lib/classNames/classNames';
import { useAppDispatch, useAppSelector } from '07-shared/hooks/appHooks';
import { fetchArticle } from '../model/services/fetchArticle/fetchArticle.thunk';
import { getArticle, getArticleIsLoading } from '../model/selectors/article.selectors';
import classes from './Article.module.scss';

const Article = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const article = useAppSelector(getArticle);
    const isLoading = useAppSelector(getArticleIsLoading);

    useEffect(() => {
        if (id) {
            const articleId = Number(id);
            dispatch(fetchArticle(articleId));
        }
    }, [id]);

    return (
        <div className={classNames(classes.Article, {
            [classes.contentReady]: !isLoading,
        })}
        >
            {isLoading
                ? <PageLoader />
                : <FormattedText text={article.text} />}
        </div>
    );
};

export default Article;
