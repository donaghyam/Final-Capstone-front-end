import styled from "styled-components"

export const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FEF9E6;
`

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #FEF9E6;
    padding-top: 10px;
    animation: fadeInAnimation ease 700ms;
    @keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
`
export const MainContent = styled.div`
    height: 100%;
    margin-right: 200px;
    margin-left: 200px;
    padding-bottom: 50px;
`

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
`

export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
    flex: 1;
`

export const RecipeCard = styled.div`
    background-color: #394D5F;
    height: 200px;
    width: 200px;
    margin: 10px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
`

export const ImageContainer = styled.div`
    height: 150px;
    width: 150px;
    display: flex;
    justify-content: center;
`

export const TableContainer = styled.div`
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 20px;
`

export const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding-top: 3px;
    padding-bottom: 3px;
    
`

export const DescriptionLabelColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
`

export const DescriptionContentColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 100%;
`

export const Line = styled.div`
    width: 100%;
    border-bottom: 3px solid #394D5F;
    margin-bottom: 5px;
    opacity: 20%;
`