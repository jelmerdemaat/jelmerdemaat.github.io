class Jekyll::Post

  def titleized_slug
    self.slug.downcase
  end
end