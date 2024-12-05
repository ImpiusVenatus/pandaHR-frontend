const TopBar = () => {
    return (
      <header className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="bg-gray-200 p-2 rounded">Settings</button>
            <button className="bg-gray-200 p-2 rounded">Profile</button>
          </div>
        </div>
      </header>
    );
  };
  
  export default TopBar;
  