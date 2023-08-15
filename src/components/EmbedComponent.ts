import { EmbedBuilder, EmbedField, EmbedFooterOptions } from 'discord.js'

interface EmbedComponentProps {
    title: string
    description: string
    thumbnailUrl: string
    imageUrl: string
    authorName: string
    authorIconUrl: string
    fields: EmbedField[]
    footer: EmbedFooterOptions
    timestamp: Date
}

export const EmbedComponent = ({
    title,
    description,
    thumbnailUrl,
    imageUrl,
    authorName,
    authorIconUrl,
    fields,
    footer,
    timestamp,
}: EmbedComponentProps) => {
    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(thumbnailUrl)
        .setImage(imageUrl)
        .setColor('LuminousVividPink')
        .setAuthor({
            name: authorName,
            iconURL: authorIconUrl,
        })
        .addFields(...fields)
        .setFooter(footer)
        .setTimestamp(timestamp)

    return embed
}
