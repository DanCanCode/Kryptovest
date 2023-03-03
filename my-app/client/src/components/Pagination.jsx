const Pagination = ({
  totalPosts,
  postPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="text-white flex space-x-6 mt-5">
      <button
        className="text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        key="prev"
      >
        Previous
      </button>
      {pages.map((num) => (
        <button
          className={`text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer ${
            num === currentPage && "bg-white/50"
          }`}
          onClick={() => setCurrentPage(num)}
          key={num}
        >
          {num}
        </button>
      ))}
      <button
        className="text-white border-[1px] py-2 px-4 border-[#3d4f7c] rounded-full cursor-pointer"
        disabled={currentPage === Math.ceil(totalPosts / postPerPage)}
        onClick={() => setCurrentPage(currentPage + 1)}
        key="next"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
