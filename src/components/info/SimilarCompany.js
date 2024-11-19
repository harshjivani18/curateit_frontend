import React from 'react'

const SimilarCompany = ({ company, openUrl }) => {

  return (
    <div
      key={company?.id}
      className="min-h-8 w-full p-2 rounded-md border-[2px] border-gray-400 flex items-center cursor-pointer"
      onClick={() => openUrl(company?.domain)}
    >
      <h2 className="text-black text-sm font-semibold flex-1 break-words">
        {company?.name}
      </h2>
    </div>
  )
}

export default SimilarCompany