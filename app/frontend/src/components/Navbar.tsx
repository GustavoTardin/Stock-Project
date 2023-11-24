// import { useState } from 'react';
import '../Styles/Navbar.css';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { AuthStateUserObject } from 'react-auth-kit/dist/types';
import AdminPanel from './Admin/AdminPanel';
import { Theme } from './Theme';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { CaretDownIcon } from '@radix-ui/react-icons';
import React  from 'react';

function NavBar() {
  const signOut = useSignOut();

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userInfo = useAuthUser() as () => AuthStateUserObject;
  const { credentialName } = userInfo();
  
  const isAdmin = credentialName === 'Admin';
  const storeAccess = isAdmin || credentialName === 'Lojista';
  const stockAccess = isAdmin || credentialName === 'Estoquista';
  // const toggleDropdown = () => {
  //   setIsDropdownOpen((prev) => {
  //     console.log(isDropdownOpen);
      
  //     return !prev
  //   }); // se der errado voltar para !isDropdownOpen
  //   console.log(isDropdownOpen);
  // };
  
  type LinkNavProps = {
    href: string;
    title: string;
   };
   
   const LinkNav: React.FC<LinkNavProps> = ({ href, title }) => {
    return (
      <NavigationMenu.Item>
        <NavigationMenu.Link
          className="block select-none rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px]"
          href={href}
          title={title} 
        >
          {title}
        </NavigationMenu.Link>
      </NavigationMenu.Item>
    )
   }
   const LinkNavLi: React.FC<LinkNavProps> = ({ href, title }) => {
    return (
      <li title={title} >                   
        <NavigationMenu.Link asChild>
          <a
            className={'block select-none rounded-[6px] p-3 text-[15px] leading-none no-underline outline-none transition-colors'}
            href={href}
          >
            <div className="mb-[5px] font-medium leading-[1.2]">{title}</div>
            <p className="leading-[1.4]">
              Build high-quality, accessible design systems and web apps.
            </p>
          </a>
        </NavigationMenu.Link>
      </li>
    )
   }
  

  return (
  
    <NavigationMenu.Root className='pr-10'>
      <NavigationMenu.List className="flex row items-center">
        <LinkNav title="Início" href="/menu"/>
        {storeAccess && (
          <>
            <LinkNav title="Novo Pedido" href="/novo-pedido"/>
            <LinkNav title="Pedidos em falta" href="/produtos-em-falta"/>        
          </>
        )}
        {stockAccess && (
          <>
            <LinkNav title="Pedidos pendentes" href="/pedidos-pendentes"/>        
            <LinkNav title="Reposição de produtos" href="/reposição-de-produtos"/>        
       
          </>
        )}
        {isAdmin && (
          <>
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="group flex select-none items-center justify-between gap-[2px] rounded-[4px] px-3 py-2 text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                Painel Administrativo{' '}
                <CaretDownIcon
                  className="relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180"
                  aria-hidden
                />
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="absolute top-0 left-0 w-full sm:w-auto bg-gray-600 rounded-2xl">
                <ul className="m-0 grid list-none gap-x-[10px] p-[22px] sm:w-[600px] sm:grid-flow-col sm:grid-rows-3">
                  <LinkNavLi title="Colaboradores" href="/painel-administrativo/colaboradores" />
                  <LinkNavLi title="Produtos" href="/painel-administrativo/produtos" />
                  <LinkNavLi title="Lojas" href="/painel-administrativo/lojas" />
                  <LinkNavLi title="Valuation" href="/painel-administrativo/valuation" />
                  <LinkNavLi title="Vendas" href="/painel-administrativo/vendas"/>
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item> 
            <NavigationMenu.Item> 
              <Theme />
            </NavigationMenu.Item> 
            <NavigationMenu.Item>
              {' '}
              <button onClick={ () => signOut() }>Sair</button>
            </NavigationMenu.Item> 
          </>
        )}
        <NavigationMenu.Indicator className="NavigationMenuIndicator">    
          <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
        </NavigationMenu.Indicator>        
      </NavigationMenu.List>
      {/* <div className="perspective-[2000px] absolute top-full left-0 flex w-full justify-center"> */}
        <NavigationMenu.Viewport className="NavigationMenuViewport"/>
      {/* </div> */}
    </NavigationMenu.Root>
      // "data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut relative mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-[6px] bg-white transition-[width,_height] duration-300 sm:w-[var(--radix-navigation-menu-viewport-width)]" />
      // className="data-[state=visible]:animate-fadeIn data-[state=hidden]:animate-fadeOut top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease]">
  );
}

// const Link = ({ href, ...props }: {href: string}) => {
//   const router = useRouter();
//   const isActive = router.asPath === href;

//   return (
//     <NextLink href={href} passHref legacyBehavior>
//       <NavigationMenu.Link
//         className="NavigationMenuLink"
//         active={isActive}
//         {...props}
//       />
//     </NextLink>
//   );
// };

export default NavBar;
