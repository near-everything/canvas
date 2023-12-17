import * as React from "react";
import * as Radix from "@radix-ui/react-primitive";
import { Primitive } from "@radix-ui/react-primitive";
import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import * as VisuallyHiddenPrimitive from "@radix-ui/react-visually-hidden";
import { Scope } from "@radix-ui/react-context";
type Orientation = 'vertical' | 'horizontal';
type Direction = 'ltr' | 'rtl';
export const createNavigationMenuScope: import("@radix-ui/react-context").CreateScope;
type NavigationMenuElement = React.ElementRef<typeof Primitive.nav>;
type PrimitiveNavProps = Radix.ComponentPropsWithoutRef<typeof Primitive.nav>;
export interface NavigationMenuProps extends Omit<NavigationMenuProviderProps, keyof NavigationMenuProviderPrivateProps>, PrimitiveNavProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    dir?: Direction;
    orientation?: Orientation;
    /**
     * The duration from when the pointer enters the trigger until the tooltip gets opened.
     * @defaultValue 200
     */
    delayDuration?: number;
    /**
     * How much time a user has to enter another trigger without incurring a delay again.
     * @defaultValue 300
     */
    skipDelayDuration?: number;
}
export const NavigationMenu: React.ForwardRefExoticComponent<NavigationMenuProps & React.RefAttributes<HTMLElement>>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;
export interface NavigationMenuSubProps extends Omit<NavigationMenuProviderProps, keyof NavigationMenuProviderPrivateProps>, PrimitiveDivProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: Orientation;
}
export const NavigationMenuSub: React.ForwardRefExoticComponent<NavigationMenuSubProps & React.RefAttributes<HTMLDivElement>>;
interface NavigationMenuProviderPrivateProps {
    isRootMenu: boolean;
    scope: Scope;
    children: React.ReactNode;
    orientation: Orientation;
    dir: Direction;
    rootNavigationMenu: NavigationMenuElement | null;
    value: string;
    onTriggerEnter(itemValue: string): void;
    onTriggerLeave?(): void;
    onContentEnter?(): void;
    onContentLeave?(): void;
    onItemSelect(itemValue: string): void;
    onItemDismiss(): void;
}
interface NavigationMenuProviderProps extends NavigationMenuProviderPrivateProps {
}
type PrimitiveUnorderedListProps = Radix.ComponentPropsWithoutRef<typeof Primitive.ul>;
export interface NavigationMenuListProps extends PrimitiveUnorderedListProps {
}
export const NavigationMenuList: React.ForwardRefExoticComponent<NavigationMenuListProps & React.RefAttributes<HTMLUListElement>>;
type FocusProxyElement = React.ElementRef<typeof VisuallyHiddenPrimitive.Root>;
type PrimitiveListItemProps = Radix.ComponentPropsWithoutRef<typeof Primitive.li>;
export interface NavigationMenuItemProps extends PrimitiveListItemProps {
    value?: string;
}
export const NavigationMenuItem: React.ForwardRefExoticComponent<NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>>;
type NavigationMenuTriggerElement = React.ElementRef<typeof Primitive.button>;
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;
export interface NavigationMenuTriggerProps extends PrimitiveButtonProps {
}
export const NavigationMenuTrigger: React.ForwardRefExoticComponent<NavigationMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type PrimitiveLinkProps = Radix.ComponentPropsWithoutRef<typeof Primitive.a>;
export interface NavigationMenuLinkProps extends Omit<PrimitiveLinkProps, 'onSelect'> {
    active?: boolean;
    onSelect?: (event: Event) => void;
}
export const NavigationMenuLink: React.ForwardRefExoticComponent<NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export interface NavigationMenuIndicatorProps extends NavigationMenuIndicatorImplProps {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
export const NavigationMenuIndicator: React.ForwardRefExoticComponent<NavigationMenuIndicatorProps & React.RefAttributes<HTMLDivElement>>;
interface NavigationMenuIndicatorImplProps extends PrimitiveDivProps {
}
export interface NavigationMenuContentProps extends Omit<NavigationMenuContentImplProps, keyof NavigationMenuContentImplPrivateProps> {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
export const NavigationMenuContent: React.ForwardRefExoticComponent<NavigationMenuContentProps & React.RefAttributes<HTMLDivElement>>;
type DismissableLayerProps = Radix.ComponentPropsWithoutRef<typeof DismissableLayer>;
interface NavigationMenuContentImplPrivateProps {
    value: string;
    triggerRef: React.RefObject<NavigationMenuTriggerElement>;
    focusProxyRef: React.RefObject<FocusProxyElement>;
    wasEscapeCloseRef: React.MutableRefObject<boolean>;
    onContentFocusOutside(): void;
    onRootContentClose(): void;
}
interface NavigationMenuContentImplProps extends Omit<DismissableLayerProps, 'onDismiss'>, NavigationMenuContentImplPrivateProps {
}
export interface NavigationMenuViewportProps extends Omit<NavigationMenuViewportImplProps, 'children' | 'activeContentValue'> {
    /**
     * Used to force mounting when more control is needed. Useful when
     * controlling animation with React animation libraries.
     */
    forceMount?: true;
}
export const NavigationMenuViewport: React.ForwardRefExoticComponent<NavigationMenuViewportProps & React.RefAttributes<HTMLDivElement>>;
interface NavigationMenuViewportImplProps extends PrimitiveDivProps {
}
export const Root: React.ForwardRefExoticComponent<NavigationMenuProps & React.RefAttributes<HTMLElement>>;
export const Sub: React.ForwardRefExoticComponent<NavigationMenuSubProps & React.RefAttributes<HTMLDivElement>>;
export const List: React.ForwardRefExoticComponent<NavigationMenuListProps & React.RefAttributes<HTMLUListElement>>;
export const Item: React.ForwardRefExoticComponent<NavigationMenuItemProps & React.RefAttributes<HTMLLIElement>>;
export const Trigger: React.ForwardRefExoticComponent<NavigationMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export const Link: React.ForwardRefExoticComponent<NavigationMenuLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export const Indicator: React.ForwardRefExoticComponent<NavigationMenuIndicatorProps & React.RefAttributes<HTMLDivElement>>;
export const Content: React.ForwardRefExoticComponent<NavigationMenuContentProps & React.RefAttributes<HTMLDivElement>>;
export const Viewport: React.ForwardRefExoticComponent<NavigationMenuViewportProps & React.RefAttributes<HTMLDivElement>>;

//# sourceMappingURL=index.d.ts.map
