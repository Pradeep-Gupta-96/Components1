import React from 'react'

export const IndividualData = ({individualExcelData,index}) => {
    return (
        <>
            <th>{index}</th>
            <th>{individualExcelData.NoticeId}</th>
            <th>{individualExcelData.Date}</th>
            <th>{individualExcelData.Account}</th>
            <th>{individualExcelData.Name}</th>
            <th>{individualExcelData.Email}</th>
            <th>{individualExcelData.Phone}</th>
            <th>{individualExcelData.Address}</th>
        </>
    )
}
