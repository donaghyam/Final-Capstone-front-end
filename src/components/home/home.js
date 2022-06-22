import React, { useEffect } from 'react'
import { fetchIt } from "../utilities/Fetch"
import { Settings } from "../utilities/Settings";
import { useHistory } from 'react-router-dom'
import { ContentContainer, MainContent } from '../styles/Containers.style'
import { ThankYouMessage, WelcomeMessage } from '../styles/Text.style'

export const Home = () => {

    const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/recipes')
        }, 3500)
    }, 
    [])

    useEffect(() => {
        setTimeout(() => {
            history.push('/recipes')
        }, 3500)
    }, 
    [])

    return (
        <ContentContainer>
            <MainContent>
                <WelcomeMessage>Welcome</WelcomeMessage>
                <ThankYouMessage>Thank you for taking the time to check out my project.</ThankYouMessage>
            </MainContent>
        </ContentContainer>
    )
}