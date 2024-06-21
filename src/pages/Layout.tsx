import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  className?: string;
  children:any
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => (
  <div className={className}>
    <nav>
      <ul>
        <li>
          <Link to="/">Очередь на обслуживание</Link>
        </li>
        <li>
          <Link to="/inwork">Машины обслуживаются</Link>
        </li>
        <li>
          <Link to="/finish">Машины, которые прошли обслуживание</Link>
        </li>
      </ul>
    </nav>
    <main>
      {children}
    </main>
  </div>
);

export default Layout;