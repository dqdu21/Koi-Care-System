const Achievements: React.FC = () => {
  return (
    <section className="my-10">
      <div className="grid grid-cols-2 gap-x-7 gap-y-7">
        <article className="rounded-md bg-slate-200 drop-shadow-sm p-4">
          <div className="text-2xl text-center mb-7">
            <i className="fa-solid fa-display bg-amber-500 p-6 rounded-md"></i>
          </div>
          <h3 className="font-semibold text-xl text-center">100,000+ online course</h3>
          <p className="text-base text-center font-extralight">Explore a variety of fresh topics</p>
        </article>
        <article className="rounded-md bg-slate-200 drop-shadow-sm p-4">
          <div className="text-2xl text-center mb-7">
            <i className="fa-solid fa-clock-rotate-left bg-amber-500 p-6 rounded-md"></i>
          </div>
          <h3 className="font-semibold text-xl text-center">Go at your own pace</h3>
          <p className="text-base text-center font-extralight">
            Enjoy lifetime access to courses on Edututs+'s website
          </p>
        </article>
        <article className="rounded-md bg-slate-200 drop-shadow-sm p-4">
          <div className="text-2xl text-center mb-7">
            <i className="fa-solid fa-user-check bg-amber-500 p-6 rounded-md"></i>
          </div>
          <h3 className="font-semibold text-xl text-center">Learn from industry experts</h3>
          <p className="text-base text-center font-extralight">
            Select from top instructors around the world
          </p>
        </article>
        <article className="rounded-md bg-slate-200 drop-shadow-sm p-4">
          <div className="text-2xl text-center mb-7">
            <i className="fa-regular fa-circle-play bg-amber-500 p-6 rounded-md"></i>
          </div>
          <h3 className="font-semibold text-xl text-center">Find video courses on almost any topic</h3>
          <p className="text-base text-center font-extralight">
            Build your library for your career and personal growth
          </p>
        </article>
      </div>
    </section>
  );
};

export default Achievements;
