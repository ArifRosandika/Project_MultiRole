import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { IoPerson, IoLogOut, IoHome, IoPricetag } from 'react-icons/io5'
import { LogOut, reset } from '../auth/authS';


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = async () => {
      dispatch(LogOut());
      dispatch( reset());
      navigate("/login");
  };

 return (
  <div className="h-screen w-65 bg-gray-500 shadow-md">
    <aside className="flex flex-col h-full p-4 space-y-6">
      {/* General */}
      <div>
        <p className="text-sm font-bold text-gray-400 mb-2">General</p>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400"
            >
              <IoHome /> Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/products" 
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400"
            >
              <IoPricetag /> Product
            </Link>
          </li>
        </ul>
      </div>

      {/* Admin */}
      {user && user.role === "admin" && (
        <div>
          <p className="font-light text-white/50 mb-2">Admin</p>
          <ul className="space-y-2">
            <li>
              <Link 
                to="/users" 
                className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-400"
              >
                <IoPerson /> Users
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Settings */}
      <div className="mt-auto">
        <ul className="space-y-2">
          <li>
            <button 
              onClick={logout} 
              className="flex items-center gap-2 w-full p-2 rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              <IoLogOut /> Logout
            </button>
          </li>
        </ul>
      </div>
    </aside>
  </div>
 );

}

export default Sidebar