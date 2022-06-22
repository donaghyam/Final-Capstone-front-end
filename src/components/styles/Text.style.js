import styled from "styled-components"

export const Label = styled.label`
    font-size: 16px;
    color: #0B1320;
    text-transform: capitalize;
    font-weight: 600;
    font-family: 'Montserrat', sans-serif;
`

export const Content = styled.p`
    font-size: 14px;
    color: #0B1320;
`

export const Header = styled.h1`
    font-size: 30px;
    color: #0B1320;
    display: flex;
    justify-content: center;
    margin-bottom: 0px;
    padding-bottom: 10px;
    margin-bottom: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
`

export const SubHeader = styled.h2`
    font-size: 16px;
    color: #0B1320;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 1000;
`

export const PageTitle = styled.h1`
    font-size: 40px;
    color: #0B1320;
    padding-left: 10px;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
`

export const WelcomeMessage = styled.h1`
    font-size: 50px;
    color: #0B1320;
    padding-top: 10px;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 500;
    animation: fadeInAnimation ease 500ms;
    @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }}

`
export const ThankYouMessage = styled.h1`
    font-size: 30px;
    color: #0B1320;
    padding-top: 10px;
    margin-top: 0px;
    display: flex;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
    animation: fadeInAnimation ease 2500ms;
    @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }}
`