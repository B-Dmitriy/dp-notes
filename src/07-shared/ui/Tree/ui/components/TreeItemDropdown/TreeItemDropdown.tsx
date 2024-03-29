import React from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '07-shared/lib/classNames/classNames';
import { Button } from '07-shared/ui/Button/Button';
import type { TreeItemDeep, TreeItemInterface } from '07-shared/ui/Tree';
import AddIcon from '07-shared/assets/icons/add.svg';
import { TreeItem } from '../TreeItem/TreeItem';
import classes from './TreeItemDropdown.module.scss';

interface TreeItemDropdownProps {
    className?: string;
    items: TreeItemInterface[];
    isLoading?: boolean;
    onOpen: (deep: TreeItemDeep, id: number) => void;
    onClose: (deep: TreeItemDeep, id: number) => void;
    onClickHandler: (deep: TreeItemDeep, id: number) => void;
}

export const TreeItemDropdown = ({
    items,
    className,
    isLoading = false,
    onOpen,
    onClose,
    onClickHandler,
}: TreeItemDropdownProps) => {
    const { t } = useTranslation();
    const isItemNotEmpty = items !== null && items.length < 1;

    return (
        <div className={classNames(classes.TreeItemDropdown, {
            [classes.noData]: items !== null && items.length < 1,
        }, [className])}
        >
            {isItemNotEmpty && isLoading
                && (
                    <span
                        className={classes.loading}
                    >
                        {t('loading_placeholder')}
                    </span>
                )}
            {isItemNotEmpty && !isLoading
                && (
                    <Button
                        fullWidth
                        view="clear"
                        className={classes.addBtn}
                        onClick={() => alert('Add element')}
                    >
                        <span className={classes.addBtn_content}>
                            <AddIcon />
                            добавить
                        </span>
                    </Button>
                )}
            {items !== null && items.map((i) => (
                <TreeItem
                    key={i.id}
                    item={i}
                    isLoading={isLoading}
                    onOpen={onOpen}
                    onClose={onClose}
                    onClickHandler={onClickHandler}
                />
            ))}
        </div>
    );
};
