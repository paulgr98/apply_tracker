import './ContextMenu.css'

const ContextMenu = ({
    rightClickedItem,
    positionX,
    positionY,
    isToggled,
    buttons,
    contextMenuRef
}) => {
    return (
        <menu
            style={{
                top: positionY + 2 + 'px',
                left: positionX + 2 + 'px'
            }}
            className={`context-menu ${isToggled ? 'active' : ''}`}
            ref={contextMenuRef}
        >
            {buttons.map((button, index) => {
                const handleClick = (e) => {
                    e.stopPropagation()
                    button.onClick(e, rightClickedItem)
                }

                return (
                    <button
                        onClick={handleClick}
                        key={index}
                        className={`context-menu-button button-${button.type}`}
                    >
                        <span>{button.text}</span>
                        <span className='icon'>{button.icon}</span>
                    </button>
                )
            }
            )}
        </menu>
    )
}

export default ContextMenu