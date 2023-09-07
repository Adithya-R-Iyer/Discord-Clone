// "use client"

import { Menu } from "lucide-react";

import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import NavigationSidebar from "./navigation/navigation-sidebar";
import ServerSidebar from "./server/server-sidebar";
// import { useEffect } from "react";

interface MobileToggleProps {
    serverId: string;
}

const MobileToggle = ( {serverId} : MobileToggleProps) => {

  // useEffect(()=> {
    
  //   const closeButton = document.getElementById('close');
  //   const handleScreenChange = ()=> {
  //     if(window.innerWidth>=768) {
  //       closeButton?.click();
  //     }
  //   }
  //   window.addEventListener("resize", handleScreenChange);

  //   return ()=> window.removeEventListener("resize", handleScreenChange);
  // },[])

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 flex gap-0 md:hidden ">
            <div className="w-[72px]">
                <NavigationSidebar/>
            </div>
            <ServerSidebar serverId={serverId}/>
        </SheetContent>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button id="close" className="hidden">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </Sheet>
    </div>
  );
};

export default MobileToggle;
