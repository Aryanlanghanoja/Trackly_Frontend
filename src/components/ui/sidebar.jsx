
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

const SidebarContext = React.createContext({
  collapsed: false,
  setCollapsed: () => {},
  mobileOpen: false,
  setMobileOpen: () => {},
  isMobile: false,
})

const SidebarProvider = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isMobile = useIsMobile()

  React.useEffect(() => {
    if (isMobile && !mobileOpen) setCollapsed(true)
    if (!isMobile) setMobileOpen(false)
  }, [isMobile])

  return (
    <SidebarContext.Provider
      value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen, isMobile }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider")
  return context
}

const ToggleButton = React.forwardRef(
  ({ className, ...props }, ref) => {
    const { collapsed, setCollapsed, isMobile } = useSidebar()

    if (isMobile) return null

    return (
      <button
        ref={ref}
        className={cn(
          "absolute right-[-12px] top-24 flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm hover:text-foreground",
          className
        )}
        onClick={() => setCollapsed(!collapsed)}
        {...props}
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </button>
    )
  }
)
ToggleButton.displayName = "ToggleButton"

const Sidebar = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    const { collapsed, mobileOpen, isMobile } = useSidebar()

    if (isMobile) {
      return (
        <aside
          ref={ref}
          className={cn(
            "data-[state=open]:animate-sidebar-show fixed inset-y-0 left-0 z-50 w-[250px] border-r bg-background duration-300 ease-in-out data-[state=closed]:translate-x-[-100%] data-[state=open]:translate-x-0",
            className
          )}
          data-state={mobileOpen ? "open" : "closed"}
          {...props}
        >
          {children}
        </aside>
      )
    }

    return (
      <aside
        ref={ref}
        className={cn(
          "sticky inset-y-0 left-0 z-30 h-dvh border-r bg-background transition-width duration-300 ease-in-out",
          collapsed ? "w-[70px]" : "w-[250px]",
          className
        )}
        {...props}
      >
        {children}
        <ToggleButton />
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

const SidebarHeader = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <header
        ref={ref}
        className={cn(
          "flex h-14 items-center gap-4 border-b px-4 py-2",
          className
        )}
        {...props}
      />
    )
  }
)
SidebarHeader.displayName = "SidebarHeader"

const SidebarHeaderTitle = React.forwardRef(
  (
    { className, children, ...props },
    ref
  ) => {
    const { collapsed, isMobile } = useSidebar()
    const isHidden = collapsed && !isMobile

    return (
      <span
        ref={ref}
        className={cn(
          "text-base font-semibold",
          isHidden && "sr-only",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)
SidebarHeaderTitle.displayName = "SidebarHeaderTitle"

const SidebarContent = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <nav
        ref={ref}
        className={cn("overflow-y-auto p-2 scrollbar-none", className)}
        {...props}
      />
    )
  }
)
SidebarContent.displayName = "SidebarContent"

const SidebarGroup = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("pb-4", className)}
        {...props}
      />
    )
  }
)
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef(
  (
    { className, children, ...props },
    ref
  ) => {
    const { collapsed, isMobile } = useSidebar()
    const isHidden = collapsed && !isMobile

    return (
      <div
        ref={ref}
        className={cn(
          "px-2 py-1.5",
          isHidden && "sr-only",
          className
        )}
        {...props}
      >
        <div className="text-xs font-medium text-muted-foreground">
          {children}
        </div>
      </div>
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      />
    )
  }
)
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-1", className)}
        {...props}
      />
    )
  }
)
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      />
    )
  }
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const SidebarMenuButton = React.forwardRef(
  (
    {
      className,
      children,
      asChild,
      ...props
    },
    ref
  ) => {
    const { collapsed, isMobile } = useSidebar()
    const isCollapsed = collapsed && !isMobile
    const Comp = asChild ? React.Fragment : "button"
    const childProps = asChild ? { className: "" } : {}

    return (
      <Comp
        ref={ref}
        className={cn(
          "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {asChild ? (
          React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              ...childProps,
              className: cn(
                "group flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                child.props.className
              ),
              children: React.Children.toArray(child.props.children).map(
                (grandChild, i) => {
                  return isCollapsed && i > 0 ? null : grandChild
                }
              ),
            })
          })
        ) : (
          <>
            {React.Children.map(children, (child, i) => {
              if (isCollapsed && i > 0) return null
              return child
            })}
          </>
        )}
      </Comp>
    )
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarFooter = React.forwardRef(
  (
    { className, ...props },
    ref
  ) => {
    return (
      <footer
        ref={ref}
        className={cn("border-t px-2 py-2", className)}
        {...props}
      />
    )
  }
)
SidebarFooter.displayName = "SidebarFooter"

const SidebarTrigger = React.forwardRef(
  (
    { className, children, showText = true, ...props },
    ref
  ) => {
    const { mobileOpen, setMobileOpen, isMobile } = useSidebar()

    if (!isMobile) return null

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => setMobileOpen(true)}
        className={cn(
          "inline-flex items-center gap-x-2 text-sm font-semibold",
          className
        )}
        {...props}
      >
        <ChevronRight className="h-4 w-4" />
        {showText && <span>Menu</span>}
      </button>
    )
  }
)
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarOverlay = () => {
  const { mobileOpen, setMobileOpen, isMobile } = useSidebar()
  if (!isMobile) return null

  return (
    <div
      onClick={() => setMobileOpen(false)}
      className={cn(
        "bg-black/50 fixed inset-0 z-40 lg:hidden",
        mobileOpen ? "block" : "hidden"
      )}
    />
  )
}

export {
  Sidebar,
  SidebarOverlay,
  SidebarProvider,
  SidebarHeader,
  SidebarHeaderTitle,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
}
