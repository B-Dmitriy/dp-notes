import React from 'react';
import { LinearLoader } from '07-shared/ui/LinearLoader/LinearLoader';
import classes from './Tree.module.scss';
import { TreeItem } from '../components/TreeItem/TreeItem';
import { TreeProps } from '../../types/Tree.types';

export function Tree({
    items,
    isLoading = false,
    onOpen,
    onClose,
    onItemClick,
}: TreeProps) {
    return (
        <div className={classes.tree_wrapper}>
            <LinearLoader isLoading={isLoading} />
            {
                items.map((i) => (
                    <TreeItem
                        key={i.id}
                        item={i}
                        isLoading={isLoading}
                        onOpen={onOpen}
                        onClose={onClose}
                        onClickHandler={onItemClick}
                    />
                ))
            }
        </div>
    );
}
