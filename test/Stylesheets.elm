port module Stylesheets exposing (..)

import Css exposing (..)
import Css.Elements exposing (..)
import Css.File exposing (CssFileStructure, CssCompilerProgram)


port files : CssFileStructure -> Cmd msg


fileStructure : CssFileStructure
fileStructure =
    Css.File.toFileStructure
        [ ( "main.css"
          , Css.File.compile
                [ stylesheet
                    [ header
                        [ backgroundColor (rgb 0 0 0)
                        , color (rgb 255 255 255)
                        ]
                    ]
                ]
          )
        ]


main : CssCompilerProgram
main =
    Css.File.compiler files fileStructure
