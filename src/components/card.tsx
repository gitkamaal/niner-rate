const Card: React.FC = ({}) => {
  return (
    <div className="flex items-center justify-center bg-white">
      <div className="mt-44 p-16 px-52 bg-gold shadow-lg rounded-lg flex flex-col items-center space-y-8">
        <h2 className="text-3xl text-white font-bold">Enter Course Here</h2>
        <input
          type="text"
          className="w-full h-10 px-5 rounded-lg"
          placeholder="Course"
        />
        <h2 className="text-2xl text-white">
          University of North Carolina Charlotte
        </h2>
      </div>
    </div>
  );
};

export default Card;
