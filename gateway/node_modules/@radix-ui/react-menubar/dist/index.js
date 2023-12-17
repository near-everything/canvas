var $fIWtd$babelruntimehelpersextends = require("@babel/runtime/helpers/extends");
var $fIWtd$react = require("react");
var $fIWtd$radixuireactcollection = require("@radix-ui/react-collection");
var $fIWtd$radixuireactdirection = require("@radix-ui/react-direction");
var $fIWtd$radixuiprimitive = require("@radix-ui/primitive");
var $fIWtd$radixuireactcomposerefs = require("@radix-ui/react-compose-refs");
var $fIWtd$radixuireactcontext = require("@radix-ui/react-context");
var $fIWtd$radixuireactid = require("@radix-ui/react-id");
var $fIWtd$radixuireactmenu = require("@radix-ui/react-menu");
var $fIWtd$radixuireactrovingfocus = require("@radix-ui/react-roving-focus");
var $fIWtd$radixuireactprimitive = require("@radix-ui/react-primitive");
var $fIWtd$radixuireactusecontrollablestate = require("@radix-ui/react-use-controllable-state");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "createMenubarScope", () => $f5560139001bae38$export$7a4049d5555b545c);
$parcel$export(module.exports, "Menubar", () => $f5560139001bae38$export$7d4583da7581e674);
$parcel$export(module.exports, "MenubarMenu", () => $f5560139001bae38$export$c777b394d551050b);
$parcel$export(module.exports, "MenubarTrigger", () => $f5560139001bae38$export$df05cd234081ebd5);
$parcel$export(module.exports, "MenubarPortal", () => $f5560139001bae38$export$a98ed304d621e164);
$parcel$export(module.exports, "MenubarContent", () => $f5560139001bae38$export$f42a00bc8a46c161);
$parcel$export(module.exports, "MenubarGroup", () => $f5560139001bae38$export$7669e79198e0f2eb);
$parcel$export(module.exports, "MenubarLabel", () => $f5560139001bae38$export$39935c5b19a4b4e);
$parcel$export(module.exports, "MenubarItem", () => $f5560139001bae38$export$92f903c8c91c291c);
$parcel$export(module.exports, "MenubarCheckboxItem", () => $f5560139001bae38$export$372384eccd27af53);
$parcel$export(module.exports, "MenubarRadioGroup", () => $f5560139001bae38$export$94dfa2322f330fdb);
$parcel$export(module.exports, "MenubarRadioItem", () => $f5560139001bae38$export$7d2f467b4a7f68d8);
$parcel$export(module.exports, "MenubarItemIndicator", () => $f5560139001bae38$export$63e15a0e2af5a57);
$parcel$export(module.exports, "MenubarSeparator", () => $f5560139001bae38$export$588aef9e7b5183b5);
$parcel$export(module.exports, "MenubarArrow", () => $f5560139001bae38$export$474b9891f5b9e633);
$parcel$export(module.exports, "MenubarSub", () => $f5560139001bae38$export$ed0be551778c493a);
$parcel$export(module.exports, "MenubarSubTrigger", () => $f5560139001bae38$export$1820ea18a1dfed3c);
$parcel$export(module.exports, "MenubarSubContent", () => $f5560139001bae38$export$1b21e255bb3e4f7f);
$parcel$export(module.exports, "Root", () => $f5560139001bae38$export$be92b6f5f03c0fe9);
$parcel$export(module.exports, "Menu", () => $f5560139001bae38$export$d9b273488cd8ce6f);
$parcel$export(module.exports, "Trigger", () => $f5560139001bae38$export$41fb9f06171c75f4);
$parcel$export(module.exports, "Portal", () => $f5560139001bae38$export$602eac185826482c);
$parcel$export(module.exports, "Content", () => $f5560139001bae38$export$7c6e2c02157bb7d2);
$parcel$export(module.exports, "Group", () => $f5560139001bae38$export$eb2fcfdbd7ba97d4);
$parcel$export(module.exports, "Label", () => $f5560139001bae38$export$b04be29aa201d4f5);
$parcel$export(module.exports, "Item", () => $f5560139001bae38$export$6d08773d2e66f8f2);
$parcel$export(module.exports, "CheckboxItem", () => $f5560139001bae38$export$16ce288f89fa631c);
$parcel$export(module.exports, "RadioGroup", () => $f5560139001bae38$export$a98f0dcb43a68a25);
$parcel$export(module.exports, "RadioItem", () => $f5560139001bae38$export$371ab307eab489c0);
$parcel$export(module.exports, "ItemIndicator", () => $f5560139001bae38$export$c3468e2714d175fa);
$parcel$export(module.exports, "Separator", () => $f5560139001bae38$export$1ff3c3f08ae963c0);
$parcel$export(module.exports, "Arrow", () => $f5560139001bae38$export$21b07c8f274aebd5);
$parcel$export(module.exports, "Sub", () => $f5560139001bae38$export$d7a01e11500dfb6f);
$parcel$export(module.exports, "SubTrigger", () => $f5560139001bae38$export$2ea8a7a591ac5eac);
$parcel$export(module.exports, "SubContent", () => $f5560139001bae38$export$6d4de93b380beddf);














/* -------------------------------------------------------------------------------------------------
 * Menubar
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$MENUBAR_NAME = 'Menubar';
const [$f5560139001bae38$var$Collection, $f5560139001bae38$var$useCollection, $f5560139001bae38$var$createCollectionScope] = $fIWtd$radixuireactcollection.createCollection($f5560139001bae38$var$MENUBAR_NAME);
const [$f5560139001bae38$var$createMenubarContext, $f5560139001bae38$export$7a4049d5555b545c] = $fIWtd$radixuireactcontext.createContextScope($f5560139001bae38$var$MENUBAR_NAME, [
    $f5560139001bae38$var$createCollectionScope,
    $fIWtd$radixuireactrovingfocus.createRovingFocusGroupScope
]);
const $f5560139001bae38$var$useMenuScope = $fIWtd$radixuireactmenu.createMenuScope();
const $f5560139001bae38$var$useRovingFocusGroupScope = $fIWtd$radixuireactrovingfocus.createRovingFocusGroupScope();
const [$f5560139001bae38$var$MenubarContextProvider, $f5560139001bae38$var$useMenubarContext] = $f5560139001bae38$var$createMenubarContext($f5560139001bae38$var$MENUBAR_NAME);
const $f5560139001bae38$export$7d4583da7581e674 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , value: valueProp , onValueChange: onValueChange , defaultValue: defaultValue , loop: loop = true , dir: dir , ...menubarProps } = props;
    const direction = $fIWtd$radixuireactdirection.useDirection(dir);
    const rovingFocusGroupScope = $f5560139001bae38$var$useRovingFocusGroupScope(__scopeMenubar);
    const [value1 = '', setValue] = $fIWtd$radixuireactusecontrollablestate.useControllableState({
        prop: valueProp,
        onChange: onValueChange,
        defaultProp: defaultValue
    }); // We need to manage tab stop id manually as `RovingFocusGroup` updates the stop
    // based on focus, and in some situations our triggers won't ever be given focus
    // (e.g. click to open and then outside to close)
    const [currentTabStopId, setCurrentTabStopId] = $fIWtd$react.useState(null);
    return /*#__PURE__*/ $fIWtd$react.createElement($f5560139001bae38$var$MenubarContextProvider, {
        scope: __scopeMenubar,
        value: value1,
        onMenuOpen: $fIWtd$react.useCallback((value)=>{
            setValue(value);
            setCurrentTabStopId(value);
        }, [
            setValue
        ]),
        onMenuClose: $fIWtd$react.useCallback(()=>setValue('')
        , [
            setValue
        ]),
        onMenuToggle: $fIWtd$react.useCallback((value)=>{
            setValue((prevValue)=>Boolean(prevValue) ? '' : value
            ); // `openMenuOpen` and `onMenuToggle` are called exclusively so we
            // need to update the id in either case.
            setCurrentTabStopId(value);
        }, [
            setValue
        ]),
        dir: direction,
        loop: loop
    }, /*#__PURE__*/ $fIWtd$react.createElement($f5560139001bae38$var$Collection.Provider, {
        scope: __scopeMenubar
    }, /*#__PURE__*/ $fIWtd$react.createElement($f5560139001bae38$var$Collection.Slot, {
        scope: __scopeMenubar
    }, /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactrovingfocus.Root, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        asChild: true
    }, rovingFocusGroupScope, {
        orientation: "horizontal",
        loop: loop,
        dir: direction,
        currentTabStopId: currentTabStopId,
        onCurrentTabStopIdChange: setCurrentTabStopId
    }), /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactprimitive.Primitive.div, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        role: "menubar"
    }, menubarProps, {
        ref: forwardedRef
    }))))));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$7d4583da7581e674, {
    displayName: $f5560139001bae38$var$MENUBAR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarMenu
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$MENU_NAME = 'MenubarMenu';
const [$f5560139001bae38$var$MenubarMenuProvider, $f5560139001bae38$var$useMenubarMenuContext] = $f5560139001bae38$var$createMenubarContext($f5560139001bae38$var$MENU_NAME);
const $f5560139001bae38$export$c777b394d551050b = (props)=>{
    const { __scopeMenubar: __scopeMenubar , value: valueProp , ...menuProps } = props;
    const autoValue = $fIWtd$radixuireactid.useId(); // We need to provide an initial deterministic value as `useId` will return
    // empty string on the first render and we don't want to match our internal "closed" value.
    const value = valueProp || autoValue || 'LEGACY_REACT_AUTO_VALUE';
    const context = $f5560139001bae38$var$useMenubarContext($f5560139001bae38$var$MENU_NAME, __scopeMenubar);
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    const triggerRef = $fIWtd$react.useRef(null);
    const wasKeyboardTriggerOpenRef = $fIWtd$react.useRef(false);
    const open1 = context.value === value;
    $fIWtd$react.useEffect(()=>{
        if (!open1) wasKeyboardTriggerOpenRef.current = false;
    }, [
        open1
    ]);
    return /*#__PURE__*/ $fIWtd$react.createElement($f5560139001bae38$var$MenubarMenuProvider, {
        scope: __scopeMenubar,
        value: value,
        triggerId: $fIWtd$radixuireactid.useId(),
        triggerRef: triggerRef,
        contentId: $fIWtd$radixuireactid.useId(),
        wasKeyboardTriggerOpenRef: wasKeyboardTriggerOpenRef
    }, /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Root, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, {
        open: open1,
        onOpenChange: (open)=>{
            // Menu only calls `onOpenChange` when dismissing so we
            // want to close our MenuBar based on the same events.
            if (!open) context.onMenuClose();
        },
        modal: false,
        dir: context.dir
    }, menuProps)));
};
/*#__PURE__*/ Object.assign($f5560139001bae38$export$c777b394d551050b, {
    displayName: $f5560139001bae38$var$MENU_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarTrigger
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$TRIGGER_NAME = 'MenubarTrigger';
const $f5560139001bae38$export$df05cd234081ebd5 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , disabled: disabled = false , ...triggerProps } = props;
    const rovingFocusGroupScope = $f5560139001bae38$var$useRovingFocusGroupScope(__scopeMenubar);
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    const context = $f5560139001bae38$var$useMenubarContext($f5560139001bae38$var$TRIGGER_NAME, __scopeMenubar);
    const menuContext = $f5560139001bae38$var$useMenubarMenuContext($f5560139001bae38$var$TRIGGER_NAME, __scopeMenubar);
    const ref = $fIWtd$react.useRef(null);
    const composedRefs = $fIWtd$radixuireactcomposerefs.useComposedRefs(forwardedRef, ref, menuContext.triggerRef);
    const [isFocused, setIsFocused] = $fIWtd$react.useState(false);
    const open = context.value === menuContext.value;
    return /*#__PURE__*/ $fIWtd$react.createElement($f5560139001bae38$var$Collection.ItemSlot, {
        scope: __scopeMenubar,
        value: menuContext.value,
        disabled: disabled
    }, /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactrovingfocus.Item, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        asChild: true
    }, rovingFocusGroupScope, {
        focusable: !disabled,
        tabStopId: menuContext.value
    }), /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Anchor, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        asChild: true
    }, menuScope), /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactprimitive.Primitive.button, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        type: "button",
        role: "menuitem",
        id: menuContext.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? menuContext.contentId : undefined,
        "data-highlighted": isFocused ? '' : undefined,
        "data-state": open ? 'open' : 'closed',
        "data-disabled": disabled ? '' : undefined,
        disabled: disabled
    }, triggerProps, {
        ref: composedRefs,
        onPointerDown: $fIWtd$radixuiprimitive.composeEventHandlers(props.onPointerDown, (event)=>{
            // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
            // but not when the control key is pressed (avoiding MacOS right click)
            if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onMenuOpen(menuContext.value); // prevent trigger focusing when opening
                // this allows the content to be given focus without competition
                if (!open) event.preventDefault();
            }
        }),
        onPointerEnter: $fIWtd$radixuiprimitive.composeEventHandlers(props.onPointerEnter, ()=>{
            const menubarOpen = Boolean(context.value);
            if (menubarOpen && !open) {
                var _ref$current;
                context.onMenuOpen(menuContext.value);
                (_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.focus();
            }
        }),
        onKeyDown: $fIWtd$radixuiprimitive.composeEventHandlers(props.onKeyDown, (event)=>{
            if (disabled) return;
            if ([
                'Enter',
                ' '
            ].includes(event.key)) context.onMenuToggle(menuContext.value);
            if (event.key === 'ArrowDown') context.onMenuOpen(menuContext.value); // prevent keydown from scrolling window / first focused item to execute
            // that keydown (inadvertently closing the menu)
            if ([
                'Enter',
                ' ',
                'ArrowDown'
            ].includes(event.key)) {
                menuContext.wasKeyboardTriggerOpenRef.current = true;
                event.preventDefault();
            }
        }),
        onFocus: $fIWtd$radixuiprimitive.composeEventHandlers(props.onFocus, ()=>setIsFocused(true)
        ),
        onBlur: $fIWtd$radixuiprimitive.composeEventHandlers(props.onBlur, ()=>setIsFocused(false)
        )
    })))));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$df05cd234081ebd5, {
    displayName: $f5560139001bae38$var$TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarPortal
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$PORTAL_NAME = 'MenubarPortal';
const $f5560139001bae38$export$a98ed304d621e164 = (props)=>{
    const { __scopeMenubar: __scopeMenubar , ...portalProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Portal, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, portalProps));
};
/*#__PURE__*/ Object.assign($f5560139001bae38$export$a98ed304d621e164, {
    displayName: $f5560139001bae38$var$PORTAL_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarContent
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$CONTENT_NAME = 'MenubarContent';
const $f5560139001bae38$export$f42a00bc8a46c161 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , align: align = 'start' , ...contentProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    const context = $f5560139001bae38$var$useMenubarContext($f5560139001bae38$var$CONTENT_NAME, __scopeMenubar);
    const menuContext = $f5560139001bae38$var$useMenubarMenuContext($f5560139001bae38$var$CONTENT_NAME, __scopeMenubar);
    const getItems = $f5560139001bae38$var$useCollection(__scopeMenubar);
    const hasInteractedOutsideRef = $fIWtd$react.useRef(false);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Content, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        id: menuContext.contentId,
        "aria-labelledby": menuContext.triggerId,
        "data-radix-menubar-content": ""
    }, menuScope, contentProps, {
        ref: forwardedRef,
        align: align,
        onCloseAutoFocus: $fIWtd$radixuiprimitive.composeEventHandlers(props.onCloseAutoFocus, (event)=>{
            const menubarOpen = Boolean(context.value);
            if (!menubarOpen && !hasInteractedOutsideRef.current) {
                var _menuContext$triggerR;
                (_menuContext$triggerR = menuContext.triggerRef.current) === null || _menuContext$triggerR === void 0 || _menuContext$triggerR.focus();
            }
            hasInteractedOutsideRef.current = false; // Always prevent auto focus because we either focus manually or want user agent focus
            event.preventDefault();
        }),
        onFocusOutside: $fIWtd$radixuiprimitive.composeEventHandlers(props.onFocusOutside, (event)=>{
            const target = event.target;
            const isMenubarTrigger = getItems().some((item)=>{
                var _item$ref$current;
                return (_item$ref$current = item.ref.current) === null || _item$ref$current === void 0 ? void 0 : _item$ref$current.contains(target);
            });
            if (isMenubarTrigger) event.preventDefault();
        }),
        onInteractOutside: $fIWtd$radixuiprimitive.composeEventHandlers(props.onInteractOutside, ()=>{
            hasInteractedOutsideRef.current = true;
        }),
        onEntryFocus: (event)=>{
            if (!menuContext.wasKeyboardTriggerOpenRef.current) event.preventDefault();
        },
        onKeyDown: $fIWtd$radixuiprimitive.composeEventHandlers(props.onKeyDown, (event)=>{
            if ([
                'ArrowRight',
                'ArrowLeft'
            ].includes(event.key)) {
                const target = event.target;
                const targetIsSubTrigger = target.hasAttribute('data-radix-menubar-subtrigger');
                const isKeyDownInsideSubMenu = target.closest('[data-radix-menubar-content]') !== event.currentTarget;
                const prevMenuKey = context.dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
                const isPrevKey = prevMenuKey === event.key;
                const isNextKey = !isPrevKey; // Prevent navigation when we're opening a submenu
                if (isNextKey && targetIsSubTrigger) return; // or we're inside a submenu and are moving backwards to close it
                if (isKeyDownInsideSubMenu && isPrevKey) return;
                const items = getItems().filter((item)=>!item.disabled
                );
                let candidateValues = items.map((item)=>item.value
                );
                if (isPrevKey) candidateValues.reverse();
                const currentIndex = candidateValues.indexOf(menuContext.value);
                candidateValues = context.loop ? $f5560139001bae38$var$wrapArray(candidateValues, currentIndex + 1) : candidateValues.slice(currentIndex + 1);
                const [nextValue] = candidateValues;
                if (nextValue) context.onMenuOpen(nextValue);
            }
        }, {
            checkForDefaultPrevented: false
        }),
        style: {
            ...props.style,
            '--radix-menubar-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-menubar-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-menubar-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-menubar-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-menubar-trigger-height': 'var(--radix-popper-anchor-height)'
        }
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$f42a00bc8a46c161, {
    displayName: $f5560139001bae38$var$CONTENT_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarGroup
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$GROUP_NAME = 'MenubarGroup';
const $f5560139001bae38$export$7669e79198e0f2eb = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...groupProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Group, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, groupProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$7669e79198e0f2eb, {
    displayName: $f5560139001bae38$var$GROUP_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarLabel
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$LABEL_NAME = 'MenubarLabel';
const $f5560139001bae38$export$39935c5b19a4b4e = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...labelProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Label, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, labelProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$39935c5b19a4b4e, {
    displayName: $f5560139001bae38$var$LABEL_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarItem
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$ITEM_NAME = 'MenubarItem';
const $f5560139001bae38$export$92f903c8c91c291c = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...itemProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Item, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, itemProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$92f903c8c91c291c, {
    displayName: $f5560139001bae38$var$ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarCheckboxItem
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$CHECKBOX_ITEM_NAME = 'MenubarCheckboxItem';
const $f5560139001bae38$export$372384eccd27af53 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...checkboxItemProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.CheckboxItem, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, checkboxItemProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$372384eccd27af53, {
    displayName: $f5560139001bae38$var$CHECKBOX_ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarRadioGroup
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$RADIO_GROUP_NAME = 'MenubarRadioGroup';
const $f5560139001bae38$export$94dfa2322f330fdb = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...radioGroupProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.RadioGroup, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, radioGroupProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$94dfa2322f330fdb, {
    displayName: $f5560139001bae38$var$RADIO_GROUP_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarRadioItem
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$RADIO_ITEM_NAME = 'MenubarRadioItem';
const $f5560139001bae38$export$7d2f467b4a7f68d8 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...radioItemProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.RadioItem, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, radioItemProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$7d2f467b4a7f68d8, {
    displayName: $f5560139001bae38$var$RADIO_ITEM_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarItemIndicator
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$INDICATOR_NAME = 'MenubarItemIndicator';
const $f5560139001bae38$export$63e15a0e2af5a57 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...itemIndicatorProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.ItemIndicator, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, itemIndicatorProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$63e15a0e2af5a57, {
    displayName: $f5560139001bae38$var$INDICATOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarSeparator
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$SEPARATOR_NAME = 'MenubarSeparator';
const $f5560139001bae38$export$588aef9e7b5183b5 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...separatorProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Separator, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, separatorProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$588aef9e7b5183b5, {
    displayName: $f5560139001bae38$var$SEPARATOR_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarArrow
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$ARROW_NAME = 'MenubarArrow';
const $f5560139001bae38$export$474b9891f5b9e633 = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...arrowProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Arrow, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, arrowProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$474b9891f5b9e633, {
    displayName: $f5560139001bae38$var$ARROW_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarSub
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$SUB_NAME = 'MenubarSub';
const $f5560139001bae38$export$ed0be551778c493a = (props)=>{
    const { __scopeMenubar: __scopeMenubar , children: children , open: openProp , onOpenChange: onOpenChange , defaultOpen: defaultOpen  } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    const [open = false, setOpen] = $fIWtd$radixuireactusecontrollablestate.useControllableState({
        prop: openProp,
        defaultProp: defaultOpen,
        onChange: onOpenChange
    });
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.Sub, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, {
        open: open,
        onOpenChange: setOpen
    }), children);
};
/*#__PURE__*/ Object.assign($f5560139001bae38$export$ed0be551778c493a, {
    displayName: $f5560139001bae38$var$SUB_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarSubTrigger
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$SUB_TRIGGER_NAME = 'MenubarSubTrigger';
const $f5560139001bae38$export$1820ea18a1dfed3c = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...subTriggerProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.SubTrigger, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({
        "data-radix-menubar-subtrigger": ""
    }, menuScope, subTriggerProps, {
        ref: forwardedRef
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$1820ea18a1dfed3c, {
    displayName: $f5560139001bae38$var$SUB_TRIGGER_NAME
});
/* -------------------------------------------------------------------------------------------------
 * MenubarSubContent
 * -----------------------------------------------------------------------------------------------*/ const $f5560139001bae38$var$SUB_CONTENT_NAME = 'MenubarSubContent';
const $f5560139001bae38$export$1b21e255bb3e4f7f = /*#__PURE__*/ $fIWtd$react.forwardRef((props, forwardedRef)=>{
    const { __scopeMenubar: __scopeMenubar , ...subContentProps } = props;
    const menuScope = $f5560139001bae38$var$useMenuScope(__scopeMenubar);
    return /*#__PURE__*/ $fIWtd$react.createElement($fIWtd$radixuireactmenu.SubContent, ($parcel$interopDefault($fIWtd$babelruntimehelpersextends))({}, menuScope, {
        "data-radix-menubar-content": ""
    }, subContentProps, {
        ref: forwardedRef,
        style: {
            ...props.style,
            '--radix-menubar-content-transform-origin': 'var(--radix-popper-transform-origin)',
            '--radix-menubar-content-available-width': 'var(--radix-popper-available-width)',
            '--radix-menubar-content-available-height': 'var(--radix-popper-available-height)',
            '--radix-menubar-trigger-width': 'var(--radix-popper-anchor-width)',
            '--radix-menubar-trigger-height': 'var(--radix-popper-anchor-height)'
        }
    }));
});
/*#__PURE__*/ Object.assign($f5560139001bae38$export$1b21e255bb3e4f7f, {
    displayName: $f5560139001bae38$var$SUB_CONTENT_NAME
});
/* -----------------------------------------------------------------------------------------------*/ /**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */ function $f5560139001bae38$var$wrapArray(array, startIndex) {
    return array.map((_, index)=>array[(startIndex + index) % array.length]
    );
}
const $f5560139001bae38$export$be92b6f5f03c0fe9 = $f5560139001bae38$export$7d4583da7581e674;
const $f5560139001bae38$export$d9b273488cd8ce6f = $f5560139001bae38$export$c777b394d551050b;
const $f5560139001bae38$export$41fb9f06171c75f4 = $f5560139001bae38$export$df05cd234081ebd5;
const $f5560139001bae38$export$602eac185826482c = $f5560139001bae38$export$a98ed304d621e164;
const $f5560139001bae38$export$7c6e2c02157bb7d2 = $f5560139001bae38$export$f42a00bc8a46c161;
const $f5560139001bae38$export$eb2fcfdbd7ba97d4 = $f5560139001bae38$export$7669e79198e0f2eb;
const $f5560139001bae38$export$b04be29aa201d4f5 = $f5560139001bae38$export$39935c5b19a4b4e;
const $f5560139001bae38$export$6d08773d2e66f8f2 = $f5560139001bae38$export$92f903c8c91c291c;
const $f5560139001bae38$export$16ce288f89fa631c = $f5560139001bae38$export$372384eccd27af53;
const $f5560139001bae38$export$a98f0dcb43a68a25 = $f5560139001bae38$export$94dfa2322f330fdb;
const $f5560139001bae38$export$371ab307eab489c0 = $f5560139001bae38$export$7d2f467b4a7f68d8;
const $f5560139001bae38$export$c3468e2714d175fa = $f5560139001bae38$export$63e15a0e2af5a57;
const $f5560139001bae38$export$1ff3c3f08ae963c0 = $f5560139001bae38$export$588aef9e7b5183b5;
const $f5560139001bae38$export$21b07c8f274aebd5 = $f5560139001bae38$export$474b9891f5b9e633;
const $f5560139001bae38$export$d7a01e11500dfb6f = $f5560139001bae38$export$ed0be551778c493a;
const $f5560139001bae38$export$2ea8a7a591ac5eac = $f5560139001bae38$export$1820ea18a1dfed3c;
const $f5560139001bae38$export$6d4de93b380beddf = $f5560139001bae38$export$1b21e255bb3e4f7f;




//# sourceMappingURL=index.js.map
