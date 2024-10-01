const CourseCard: React.FC = () => {
  return (
    <article className="rounded-md bg-slate-200 drop-shadow-md w-full cursor-pointer hover:-translate-y-2 transition ease-out hover:delay-75 hover:shadow-md">
      <div className="p-4">
        <div>
          <img
            src="https://esuhai.vn/upload/fck_new/image/4Nursery/SONG%20&%20LV%20TAI%20NB/2022/T5/van-hoa-nhat-ban-esuhai-kaizen-ca-koi-2.jpg"
            alt="Cá Koi"
          />
        </div>
        <div className="flex justify-between my-3">
          <div>
            <span>1M buy</span>
          </div>
          <div>
            <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
          </div>
        </div>
        <h3 className="font-semibold">Cá Koi Nhật</h3>
        <div className="my-2">
          <span className="font-light text-xs">Koi Sowa</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-xs">
            By <span className="font-medium">Bố mày</span>
          </p>
          <i className="fa-solid fa-cart-plus ml-14 cursor-pointer"></i>
          <span>$200</span>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
