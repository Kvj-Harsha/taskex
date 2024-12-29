import UsersList from '../_components/UsersList';

const Home = () => {
  return (
    <div className="min-h-screen flex text-black justify-center items-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Welcome to Firebase Auth + Next.js</h1>
        <UsersList />
      </div>
    </div>
  );
};

export default Home;
