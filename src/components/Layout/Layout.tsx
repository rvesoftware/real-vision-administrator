import { LayoutProps } from '../../types/LayoutProps';
import Header from './Header';
import Navigation from './Navigation';

const Layout = ({children}: LayoutProps) => {
    return (
        <>
        <Header />
        <Navigation />
        <main>
            {children}
        </main>
        </>
    )
}

export default Layout;