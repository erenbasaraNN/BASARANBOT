const { PermissionsBitField } = require('discord.js');

module.exports = async (client, interaction) => {
    try {
        // Gerekli izin kontrolü
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({
                content: "❌ Bu komutu kullanmak için `Rolleri Yönet` yetkisine sahip olmalısın.",
                ephemeral: true
            });
        }

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply({
                content: "❌ Rolleri yönetme yetkim yok!",
                ephemeral: true
            });
        }

        // Kullanıcı ve rolü al
        const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
        const role = interaction.options.getRole('role');

        // Yetki sırası kontrolü
        if (
            interaction.member.roles.highest.position <= role.position &&
            interaction.guild.ownerId !== interaction.user.id
        ) {
            return interaction.reply({
                content: "❌ Kendi en yüksek rolüne eşit veya daha yüksek bir rol veremezsin.",
                ephemeral: true
            });
        }

        if (interaction.guild.members.me.roles.highest.position <= role.position) {
            return interaction.reply({
                content: "❌ Bu rol, botun rol sırasından daha yüksek. Verilemez.",
                ephemeral: true
            });
        }

        // Zaten rolü varsa
        if (member.roles.cache.has(role.id)) {
            return interaction.reply({
                content: "❌ Bu kullanıcının zaten bu rolü var!",
                ephemeral: true
            });
        }

        // Rolü ver
        await member.roles.add(role);

        // Başarı yanıtı
        return interaction.reply({
            embeds: [
                {
                    title: "✅ Rol Verildi",
                    color: 0x57f287,
                    fields: [
                        { name: "👤 Kullanıcı", value: member.user.tag, inline: true },
                        { name: "📛 Rol", value: role.name, inline: true },
                        { name: "🧑‍⚖️ Veren", value: interaction.user.tag, inline: true }
                    ],
                    timestamp: new Date()
                }
            ]
        });

    } catch (err) {
        console.error("❌ Rol verme hatası:", err);
        if (interaction.replied || interaction.deferred) {
            return interaction.editReply({
                content: "❌ Bir hata oluştu. Lütfen botun yetkilerini kontrol et."
            }).catch(() => { });
        } else {
            return interaction.reply({
                content: "❌ Bir hata oluştu. Lütfen botun yetkilerini kontrol et.",
                ephemeral: true
            }).catch(() => { });
        }
    }
};
