import * as React from "react";
import * as MenuPrimitive from "@radix-ui/react-menu";
import * as RovingFocusGroup from "@radix-ui/react-roving-focus";
import * as Radix from "@radix-ui/react-primitive";
import { Primitive } from "@radix-ui/react-primitive";
import { Scope } from "@radix-ui/react-context";
type ScopedProps<P> = P & {
    __scopeMenubar?: Scope;
};
export const createMenubarScope: import("@radix-ui/react-context").CreateScope;
type RovingFocusGroupProps = Radix.ComponentPropsWithoutRef<typeof RovingFocusGroup.Root>;
type PrimitiveDivProps = Radix.ComponentPropsWithoutRef<typeof Primitive.div>;
export interface MenubarProps extends PrimitiveDivProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    loop?: RovingFocusGroupProps['loop'];
    dir?: RovingFocusGroupProps['dir'];
}
export const Menubar: React.ForwardRefExoticComponent<MenubarProps & React.RefAttributes<HTMLDivElement>>;
export interface MenubarMenuProps {
    value?: string;
    children?: React.ReactNode;
}
export const MenubarMenu: {
    (props: ScopedProps<MenubarMenuProps>): JSX.Element;
    displayName: string;
};
type PrimitiveButtonProps = Radix.ComponentPropsWithoutRef<typeof Primitive.button>;
export interface MenubarTriggerProps extends PrimitiveButtonProps {
}
export const MenubarTrigger: React.ForwardRefExoticComponent<MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type MenuPortalProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;
export interface MenubarPortalProps extends MenuPortalProps {
}
export const MenubarPortal: React.FC<MenubarPortalProps>;
type MenuContentProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;
export interface MenubarContentProps extends Omit<MenuContentProps, 'onEntryFocus'> {
}
export const MenubarContent: React.ForwardRefExoticComponent<MenubarContentProps & React.RefAttributes<HTMLDivElement>>;
type MenuGroupProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.Group>;
export interface MenubarGroupProps extends MenuGroupProps {
}
export const MenubarGroup: React.ForwardRefExoticComponent<MenubarGroupProps & React.RefAttributes<HTMLDivElement>>;
type MenuLabelProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.Label>;
export interface MenubarLabelProps extends MenuLabelProps {
}
export const MenubarLabel: React.ForwardRefExoticComponent<MenubarLabelProps & React.RefAttributes<HTMLDivElement>>;
type MenuItemProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.Item>;
export interface MenubarItemProps extends MenuItemProps {
}
export const MenubarItem: React.ForwardRefExoticComponent<MenubarItemProps & React.RefAttributes<HTMLDivElement>>;
type MenuCheckboxItemProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>;
export interface MenubarCheckboxItemProps extends MenuCheckboxItemProps {
}
export const MenubarCheckboxItem: React.ForwardRefExoticComponent<MenubarCheckboxItemProps & React.RefAttributes<HTMLDivElement>>;
type MenuRadioGroupProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioGroup>;
export interface MenubarRadioGroupProps extends MenuRadioGroupProps {
}
export const MenubarRadioGroup: React.ForwardRefExoticComponent<MenubarRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
type MenuRadioItemProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>;
export interface MenubarRadioItemProps extends MenuRadioItemProps {
}
export const MenubarRadioItem: React.ForwardRefExoticComponent<MenubarRadioItemProps & React.RefAttributes<HTMLDivElement>>;
type MenuItemIndicatorProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.ItemIndicator>;
export interface MenubarItemIndicatorProps extends MenuItemIndicatorProps {
}
export const MenubarItemIndicator: React.ForwardRefExoticComponent<MenubarItemIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
type MenuSeparatorProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.Separator>;
export interface MenubarSeparatorProps extends MenuSeparatorProps {
}
export const MenubarSeparator: React.ForwardRefExoticComponent<MenubarSeparatorProps & React.RefAttributes<HTMLDivElement>>;
type MenuArrowProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.Arrow>;
export interface MenubarArrowProps extends MenuArrowProps {
}
export const MenubarArrow: React.ForwardRefExoticComponent<MenubarArrowProps & React.RefAttributes<SVGSVGElement>>;
export interface MenubarSubProps {
    children?: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?(open: boolean): void;
}
export const MenubarSub: React.FC<MenubarSubProps>;
type MenuSubTriggerProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.SubTrigger>;
export interface MenubarSubTriggerProps extends MenuSubTriggerProps {
}
export const MenubarSubTrigger: React.ForwardRefExoticComponent<MenubarSubTriggerProps & React.RefAttributes<HTMLDivElement>>;
type MenuSubContentProps = Radix.ComponentPropsWithoutRef<typeof MenuPrimitive.SubContent>;
export interface MenubarSubContentProps extends MenuSubContentProps {
}
export const MenubarSubContent: React.ForwardRefExoticComponent<MenubarSubContentProps & React.RefAttributes<HTMLDivElement>>;
export const Root: React.ForwardRefExoticComponent<MenubarProps & React.RefAttributes<HTMLDivElement>>;
export const Menu: {
    (props: ScopedProps<MenubarMenuProps>): JSX.Element;
    displayName: string;
};
export const Trigger: React.ForwardRefExoticComponent<MenubarTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export const Portal: React.FC<MenubarPortalProps>;
export const Content: React.ForwardRefExoticComponent<MenubarContentProps & React.RefAttributes<HTMLDivElement>>;
export const Group: React.ForwardRefExoticComponent<MenubarGroupProps & React.RefAttributes<HTMLDivElement>>;
export const Label: React.ForwardRefExoticComponent<MenubarLabelProps & React.RefAttributes<HTMLDivElement>>;
export const Item: React.ForwardRefExoticComponent<MenubarItemProps & React.RefAttributes<HTMLDivElement>>;
export const CheckboxItem: React.ForwardRefExoticComponent<MenubarCheckboxItemProps & React.RefAttributes<HTMLDivElement>>;
export const RadioGroup: React.ForwardRefExoticComponent<MenubarRadioGroupProps & React.RefAttributes<HTMLDivElement>>;
export const RadioItem: React.ForwardRefExoticComponent<MenubarRadioItemProps & React.RefAttributes<HTMLDivElement>>;
export const ItemIndicator: React.ForwardRefExoticComponent<MenubarItemIndicatorProps & React.RefAttributes<HTMLSpanElement>>;
export const Separator: React.ForwardRefExoticComponent<MenubarSeparatorProps & React.RefAttributes<HTMLDivElement>>;
export const Arrow: React.ForwardRefExoticComponent<MenubarArrowProps & React.RefAttributes<SVGSVGElement>>;
export const Sub: React.FC<MenubarSubProps>;
export const SubTrigger: React.ForwardRefExoticComponent<MenubarSubTriggerProps & React.RefAttributes<HTMLDivElement>>;
export const SubContent: React.ForwardRefExoticComponent<MenubarSubContentProps & React.RefAttributes<HTMLDivElement>>;

//# sourceMappingURL=index.d.ts.map
