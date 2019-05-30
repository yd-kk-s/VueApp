class CreateGrpups < ActiveRecord::Migration[5.2]
  def change
    create_table :grpups do |t|
      t.string :name

      t.timestamps
    end
  end
end
