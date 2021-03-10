import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import Link from 'src/shared/components/Link/BaseLink';
import Link from 'next/link';

export const Button = styled(Link)`
    color: #0071bb;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 18px;
    background-color: #f9cf00;
    display: inline-block;
`;

export const Heading = styled.h1`
    font-size: 48px;
    font-weight: 900;
    color: #fff;
    padding: 10px 0;
    margin: 0;
`;

export const SubHeading = styled.h3`
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding: 10px 0;
    margin: 0;
`;

export const BannerContent = styled.p`
    font-size: 14px;
    font-weight: 500;
    color: #fff;
    padding: 10px 0;
    margin: 0;
`;

export const ClearFix = styled.div`
    clear: both;
`;
