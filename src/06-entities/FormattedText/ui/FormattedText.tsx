import classes from './FormattedText.module.scss';
import {Code} from "07-shared/ui/Code/Code";
import React, {useMemo} from "react";
import { parseCode } from "../lib/parseCode/parseCode";
import { parseHeaders } from '../lib/parseHeaders/parseHeaders';
import { parseLinks } from '../lib/parseLinks/parseLinks';
import {FormattedTextTags} from "../types/FormattedText.types";

interface FormattedTextProps {
    text: string;
    className?: string;
}

export const FormattedText = ({ text, className }: FormattedTextProps) => {
    let result: JSX.Element[] = [];
    const parser = new DOMParser();

    const formattedString = useMemo(() => parseCode(parseLinks(parseHeaders(text))), [text]);
    const parsedDocument = parser.parseFromString(formattedString, 'text/html');
    const nodes = parsedDocument.body.childNodes;

    nodes.forEach((node: ChildNode, key) => {
        if(node.nodeName === FormattedTextTags.H3) {
            result.push(<h3 key={key}>{node.textContent}</h3>)
        }
        if(node.nodeName === FormattedTextTags.TEXT) {
            result.push(<span key={key}>{node.textContent}</span>)
        }
        if(node.nodeName === FormattedTextTags.A) {
            // @ts-ignore
            result.push(<a key={key} href={node.href || ''}>{node.textContent}</a>)
        }
        if(node.nodeName === FormattedTextTags.PRE) {
            result.push(<Code key={key} content={node.textContent} />)
        }
    })

    return <pre className={`${classes.FormattedText} ${className}`}>{result}</pre>;
}
