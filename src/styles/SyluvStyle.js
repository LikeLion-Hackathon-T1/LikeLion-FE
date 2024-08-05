import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        font-family: "Pretendard Variable", Pretendard, -apple-system,
        BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic",
        "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }   
    @font-face {
    font-family: "Pretendard";
    src: url("assets/fonts/Pretendard-Regular.woff2") format("woff2"),
        url("assets/fonts/Pretendard-Regular.woff") format("woff");
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: "Pretendard";
    src: url("assets/fonts/Pretendard-Medium.woff2") format("woff2"),
        url("assets/fonts/Pretendard-Medium.woff") format("woff");
    font-weight: 500;
    font-style: normal;
}

@font-face {
    font-family: "Pretendard";
    src: url("assets/fonts/Pretendard-SemiBold.woff2") format("woff2"),
        url("assets/fonts/Pretendard-SemiBold.woff") format("woff");
    font-weight: 600;
    font-style: normal;
}

@font-face {
    font-family: "Pretendard";
    src: url("assets/fonts/Pretendard-Bold.woff2") format("woff2"),
        url("assets/fonts/Pretendard-Bold.woff") format("woff");
    font-weight: 700;
    font-style: normal;
}
`;

const ScrollContainer = styled.div`
    overflow-y: auto;
    height: auto;
    min-height: 100dvh;

    // 스크롤바를 숨기는 스타일
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none; // IE 및 Edge
    scrollbar-width: none; // Firefox
`;

export { GlobalStyle, ScrollContainer };
