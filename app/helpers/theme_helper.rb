module ThemeHelper
  def nav_link(title, url, icon = nil)
    active = current_page?(url)
    link_to(url, class: "nav-link #{active ? 'active' : ''}") do
      concat(content_tag(:i, nil, class: "bi bi-#{icon}")) if icon
      concat content_tag(:tag, title)
    end
  end
  def flash_type_classes(type)
    color_classes = {
      notice: "alert-primary",
      error: "alert-danger",
      alert: "alert-danger"
    }.with_indifferent_access
    color_class = color_classes[type]
    "alert #{color_class}"
  end

  def badge(text, color_class, options = {})
    uppercase_class = "text-uppercase" if options[:uppercase]

    content_tag :span, text, class: "badge #{color_class} #{uppercase_class}"
  end

  def boolean_badge(value)
    color_class = value ? "text-bg-success" : "text-bg-secondary"

    badge(t("badges.#{value}"), color_class, uppercase: true)
  end
end