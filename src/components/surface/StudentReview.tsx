const StudentReview = () => {
  return (
    <article className="rounded-md bg-slate-200 drop-shadow-md w-full">
      <div className="p-8">
        <p>
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur architecto sed accusantium
          praesentium necessitatibus porro rem voluptas quidem temporibus dignissimos, autem voluptate? Illum
          ex optio, quod alias veniam itaque accusamus."
        </p>
        <div className="flex items-center mt-4">
          <img
            className="w-16 h-16 rounded-full"
            src="https://scontent.xx.fbcdn.net/v/t1.15752-9/445792887_431783912899775_1246498538766125176_n.jpg?stp=dst-jpg_s206x206&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=8Gqag6Yzc_UQ7kNvgF6WsUe&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QFLBdKhvk7inNgGF-6W-4iSh7UvpeZd18d153ZsTaFMwg&oe=6689F663"
            alt=""
          />
          <h3 className="text-bold font-semibold ml-3">Trần Khánh Vinh</h3>
        </div>
      </div>
    </article>
  );
};

export default StudentReview;
