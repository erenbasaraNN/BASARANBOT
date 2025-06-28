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
                content: "❌ Kendi en yüksek rolüne eşit veya daha yüksek bir rolü kaldıramazsın.",
                ephemeral: true
            });
        }

        if (interaction.guild.members.me.roles.highest.position <= role.position) {
            return interaction.reply({
                content: "❌ Bu rol, botun rol sırasından daha yüksek. Kaldırılamaz.",
                ephemeral: true
            });
        }

        // Kullanıcıda o rol yoksa
        if (!member.roles.cache.has(role.id)) {
            return interaction.reply({
                content: "❌ Bu kullanıcının bu rolü yok!",
                ephemeral: true
            });
        }

        // Rolü kaldır
        await member.roles.remove(role);

        // Başarı yanıtı
        return interaction.reply({
            embeds: [
                {
                    title: "✅ Rol Kaldırıldı",
                    color: 0x57f287,
                    fields: [
                        { name: "👤 Kullanıcı", value: member.user.tag, inline: true },
                        { name: "📛 Kaldırılan Rol", value: role.name, inline: true },
                        { name: "🧑‍⚖️ Kaldıran Yetkili", value: interaction.user.tag, inline: true }
                    ],
                    timestamp: new Date()
                }
            ]
        });

    } catch (err) {
        console.error("❌ Rol kaldırma hatası:", err);

        if (interaction.replied || interaction.deferred) {
            return interaction.editReply({
                content: "❌ Bir hata oluştu. Lütfen botun yetkilerini ve rol sırasını kontrol et."
            }).catch(() => { });
        } else {
            return interaction.reply({
                content: "❌ Bir hata oluştu. Lütfen botun yetkilerini ve rol sırasını kontrol et.",
                ephemeral: true
            }).catch(() => { });
        }
    }
};
