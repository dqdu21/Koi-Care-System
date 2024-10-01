const InstructorCard = () => {
  return (
    <article className="rounded-md bg-slate-200 drop-shadow-md w-full cursor-pointer  hover:shadow-md">
      <div className="p-8">
        <div className="mb-5">
          <img
            className="m-auto w-24 h-24 rounded-full text-center"
            src="https://img-b.udemycdn.com/user/200_H/7799204_2091_5.jpg"
            alt=""
          />
        </div>
        <div className="flex items-center justify-center mb-3">
          <h3 className="text-base font-semibold mr-2">Jonas Schmedtmann</h3>
          <i className="fa-regular fa-circle-check text-sky-700"></i>
        </div>
        <p className="text-center font-extralight">Web development</p>
        <div className="flex justify-between mt-3 w-1/2 m-auto">
          <i className="fa-brands fa-square-facebook text-blue-600 text-2xl"></i>
          <i className="fa-brands fa-square-x-twitter text-2xl"></i>
          <i className="fa-solid fa-link-slash text-2xl"></i>
          <i className="fa-brands fa-youtube text-red-500 text-2xl"></i>
        </div>
        <p className="text-center font-extralight mt-3">1M+ Students - 7 courses</p>
      </div>
    </article>
  );
};

export default InstructorCard;
