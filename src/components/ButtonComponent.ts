import { ButtonBuilder, ButtonStyle } from 'discord.js'

interface ButtonComponentProps {
    customId: string
    label: string
    style: ButtonStyle
    emoji: string
}

export const ButtonComponent = ({
    customId,
    label,
    style,
    emoji,
}: ButtonComponentProps) => {
    const button = new ButtonBuilder()
        .setCustomId(customId)
        .setLabel(label)
        .setStyle(style)
        .setEmoji(emoji)

    return button
}
