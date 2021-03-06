import * as React from "react";
import { LinkButton } from "./LinkButton";

interface IProps {
    name: string;
    url: string;
    text?: string;
};

export const SubscribeButton = (props: IProps) => {
    let buttonClass: string | undefined;
    let titlePrefix: string;
    
    if (props.url.indexOf(".onion/") > 0) {
        buttonClass = "btn-success";
        titlePrefix = "Tor address - ";
    } else if (props.url.indexOf("http://") === 0) {
        buttonClass = "btn-danger";
        titlePrefix = "Not Secure - ";
    } else {
        buttonClass = undefined;
        titlePrefix = "";
    }
    
    const hrefTitle = `&amp;title=${encodeURIComponent(props.name)}`;
    let href;
if (props.url.indexOf(".tpl") > 0) 
{
    href = `https://raw.githubusercontent.com/collinbarrett/FilterLists/master/data/TPLSubscriptionAssistant.html`;
} else {
    href = `abp:subscribe?location=${encodeURIComponent(props.url)}${hrefTitle}`;
};
    let title;
if (props.url.indexOf(".tpl") > 0) 
{
    title = `${titlePrefix}Visit a TPL archive from which ${props.name} can be subscribed to with Internet Explorer.`;
} else {
    title = `${titlePrefix}Subscribe to ${props.name} with a browser extension supporting the \"abp:\" protocol (e.g. uBlock Origin, Adblock Plus).`;
};

    return props.url
               ? <LinkButton href={href}
                             title={title}
                             buttonClass={buttonClass}
                             text={props.text || "Subscribe"}/>
               : null;
};
