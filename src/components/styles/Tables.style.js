import styled from "styled-components"

export const Table = styled.table`
    background-color: #0B1320;
    opacity: 85%;
    border: 1px solid;
    display: flex;
    width: fit-content;
`

export const TableHeader = styled.thead`
    background-color: #FFB03A;
`

export const TableBody = styled.tbody`
    width: 100%;
`
export const TableRow = styled.tr`
    height: 40px;
    :hover {opacity: 50%;}
`
export const TH = styled.th`
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
 
    color: white;
    border: 1px solid #ddd;
    padding: 8px;
`
export const TableData = styled.td`
    color: #FEF9E6;
    border: 1px solid;
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
`